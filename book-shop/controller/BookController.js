const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');

const {StatusCodes} = require('http-status-codes');
const { all } = require('../routes/users');

const { promisify } = require('util');
const query = promisify(conn.query).bind(conn);


//(카테고리별, 신간 여부)전체 도서 조회
const getAllBooks = async (req, res) => {
    try {
      const { category_id, news, limit, currentPage } = req.query;
  
      const parsedLimit = parseInt(limit);
      const parsedOffset = parsedLimit * (parseInt(currentPage) - 1);
  
      let sql = "SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE likes.liked_book_id = books.id) AS likes FROM books";
      const values = [];
  
      if (category_id && news === "true") {
        sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND NOW()";
        values.push(parseInt(category_id));
      } else if (category_id) {
        sql += " WHERE category_id=?";
        values.push(parseInt(category_id));
      } else if (news === "true") {
        sql += " WHERE pub_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND NOW()";
      }
  
      sql += " LIMIT ? OFFSET ?";
      values.push(parsedLimit, parsedOffset);
  
      // ✅ 첫 번째 쿼리 실행
      const books = await query(sql, values);
  
      if (books.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
  
      // ✅ 두 번째 쿼리 실행
      const countResults = await query("SELECT FOUND_ROWS() as totalCount");
      const totalCount = countResults[0].totalCount;
  
      return res.status(StatusCodes.OK).json({
        books,
        pagination: {
          totalCount,
          currentPage: parseInt(currentPage),
        }
      });
  
    } catch (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  };
  
// const getAllBooks = (req, res) => {

//     let allBooksResponse = {};

//     let {category_id, news, limit, currentPage } = req.query;
//     // LIMIT → 출력할 행의 수
//     // OFFSET  → 시작 지점
//     // -> offset -> limit * (currentPage-1)
//     let offset = limit * (currentPage-1);

//     limit = parseInt(limit);
//     offset = parseInt(offset);

//     console.log("category_id:", category_id, "newBooks:", news);
    

//     let sql = "SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE likes.liked_book_id = books.id) AS likes FROM books";
//     let values= [];

//     if (category_id && news) {
//         category_id = parseInt(category_id);
//         sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND NOW()";
//         values.push(category_id);
//     }
//     else if (category_id) {
//         category_id = parseInt(category_id);
//         sql += " WHERE category_id=?";
//         values.push(category_id);

//     }
//     else if (news === "true") {
//         sql += " WHERE pub_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND NOW()";
    
//     }

//     sql += " LIMIT ? OFFSET ?;";
//     values.push(limit, offset);

//     conn.query(sql, values,
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 // return res.status(StatusCodes.BAD_REQUEST).end();
//             }
//             console.log("results1:", results);

//             if (results.length) {
//                 allBooksResponse.books = results
//             }
                
//             else
//                 return res.status(StatusCodes.NOT_FOUND).end();
//         }
//     )

//     sql = "SELECT FOUND_ROWS() as totalCount;";

//     conn.query(sql, values,
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(StatusCodes.BAD_REQUEST).end();
//             }

//             let totalCount = results[0].totalCount;
//             let pagination = {
//                 totalCount: totalCount,
//                 currentPage: parseInt(currentPage),
//             }

//             allBooksResponse.pagination = pagination;

            
//             return res.status(StatusCodes.OK).json(allBooksResponse);
            
//         }
//     )

// };

//개별 도서 조회
const getBook = (req, res) => {

    let {user_id} = req.body;
    let book_id = req.params.id;
    //id = parseInt(id);


    //books.id , category.id 중복 문제 AS 별명 지어주기!
    let sql = `SELECT books.*,
                (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes, 
                (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked,
                category.category_name
                FROM books 
                LEFT JOIN category 
                ON books.category_id = category.id
                WHERE books.id=?;`;

    let values = [user_id, book_id, book_id];

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results[0])
                return res.status(StatusCodes.OK).json(results[0]);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        }
    )
};



module.exports = {
    getAllBooks,
    getBook
};