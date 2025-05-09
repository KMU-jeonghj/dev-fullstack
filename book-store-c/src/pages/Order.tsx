import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '../models/order.model';
import FindAddressButton from '../components/order/FindAddressButton';
import { order } from '../api/order.api';
import { useAlert } from '../hooks/useAlert';


export interface DeliveryForm extends Delivery {
    addressDetail: string;
}



const Order = () => {
    const {showAlert, showConfirm} = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    //console.log("Order location.state:", location.state);
    const stateFromRouter = location.state;
    const fallback = localStorage.getItem("orderData");
    //const orderDataFromCart = stateFromRouter ?? (fallback ? JSON.parse(fallback) : null);
    const orderDataFromCart = stateFromRouter;

    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<DeliveryForm>({
        defaultValues: {
            address: "",
            addressDetail: "",
            receiver: "",
            contact: "",
        }
    });

    useEffect(() => {
        if (!orderDataFromCart || orderDataFromCart.totalQuantity === 0) {
          alert("잘못된 접근입니다. 장바구니에서 다시 시작해주세요.");
          navigate("/cart");
        }
      }, [orderDataFromCart, navigate]);

      if (!orderDataFromCart) return null;

    const {totalQuantity, totalPrice, firstBookTitle} = orderDataFromCart;

    

    const handlePay = (data: DeliveryForm) => {
        console.log(data);
        const orderData: OrderSheet = {
            ...orderDataFromCart,
            delivery: {
                ...data,
                address: `${data.address} ${data.addressDetail}`,
            }
        };
        console.log('orderData', orderData);

        //주문 정보 서버로 전송
        showConfirm("주문을 진행하시겠습니까?", () => {
            order(orderData).then(() => {
                showAlert("주문이 처리되었습니다.");
                navigate("/orderlist");
            });
        });

        
    }
    

  return (
    <>
    <Title size='large'>주문 작성</Title>
    <CartStyle>
      <div className="content">
        <div className="order-info">
            <Title size='medium' color='text'>배송 정보</Title>
            <form className='delivery' onSubmit={(e) => e.preventDefault()} >
                <fieldset>
                    <label>주소</label>
                    <div className="input">
                        <InputText inputType='text'
                        {...register("address", {required: true})}/>
                    </div>
                    <FindAddressButton onCompleted={(address) => {
                        
                        setValue("address", address);
                        const addressInput = watch("address");
                        console.log("현재 주소 입력값:", addressInput);
                    }}/>
                </fieldset>
                {errors.address && <p className='error-text'>주소를 입력해 주세요.</p>}

                <fieldset>
                    <label>상세주소</label>
                    <div className="input">
                        <InputText inputType='text'
                        {...register("addressDetail", {required: true})}/>
                    </div>
                </fieldset>
                {errors.address && <p className='error-text'>상세주소를 입력해 주세요.</p>}

                <fieldset>
                    <label>수령인</label>
                    <div className="input">
                        <InputText inputType='text'
                        {...register("receiver", {required: true})}/>
                    </div>
                </fieldset>
                {errors.address && <p className='error-text'>수령인을 입력해 주세요.</p>}

                <fieldset>
                    <label>전화번호</label>
                    <div className="input">
                        <InputText inputType='text'
                        {...register("contact", {required: true})}/>
                    </div>
                </fieldset>
                {errors.address && <p className='error-text'>전화번호를 입력해 주세요.</p>}
            </form>
        </div>
        <div className="order-info">
            <Title size='medium' color='text'>주문 상품</Title>
            <strong>
                {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
        </div>
      </div>
      <div className="summary">
        <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
        <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>
            결제하기
            </Button>
      </div>
    </CartStyle>
    </>
  )
}

const OrderStyle = styled.div``;

export default Order
