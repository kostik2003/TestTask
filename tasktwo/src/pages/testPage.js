import Container from 'react-bootstrap/esm/Container';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/esm/Button';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {CheckJsonReq} from '../http/useApi'



import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';



const TestPage = () => {
    const [message, setMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [messageDirty, setMessageDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [nameError, setNameError] = useState('Имя и Фамилия не могут быть пустыми')
    const [nameDirty, setNameDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [phoneError, setPhoneError] = useState('Телефон не может быть пустым')
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [messageError, setMessageError] = useState("Сообщение не может быть пустым")


    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
        if(emailError || messageError || phoneError || nameError) {
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }
    }, [emailError, messageError, phoneError, nameError])

    const checkNameSurnameHandler = (e) => {
        setName(e.target.value)
        const patterName = /[А-Яа-я]{3,30}/;
        if (patterName === "") return false;
        const arr =  e.target.value.split(' ');
        if (arr.length != 2) return false;
        const [firstName, lastName] = arr;

        if(!patterName.test(firstName) && patterName.test(lastName)) {
            setNameError('Минимальное число символов в имени 3')
        }
        else {
            setNameError('')
        }
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value)
        const rePhone = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        if(!rePhone.test(e.target.value)){
            setPhoneError("Некорректный номер телефона")
        }
        else {
            setPhoneError('')
        }
    }

    const messageHandler = (e) => {
        setMessage(e.target.value)
        if(e.target.value.length < 10 || e.target.value.length > 300 ) {
            setMessageError("Сообщение должно быть длиннее 10 и меньше 300 сиволов")
            if(!e.target.value){
                setMessageError("Сообщение не может быть пустым")
            }
        }
        else {
            setMessageError('')
        }
    };



    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(e.target.value).toLowerCase()))
        {
            setEmailError("Некорректный email")
        }
        else  {
            setEmailError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            case 'message':
                setMessageDirty(true)
                break
        }
    }

    const click = async () => {
        const response =await CheckJsonReq(name, phone, message, email)

        setTimeout(() => {console.log(response)}, 1000)
        if (response) {

        }
    }
    return (
        <div className="App">
            <form>
                <Container className= "d-flex justify-content-center align-items-center"
                           style={{height: window.innerHeight - 54}}
                >
                    <Card style={{width: 800}} className="p-5">
                        <h2 className='m-auto'>Форма обратной связи</h2>

                        <Form className="d-flex flex-column">
                            {(nameDirty && nameError) && <div style={{color:'red'}}>{nameError}</div>}
                            <Form.Control
                                onChange={e => checkNameSurnameHandler(e)}
                                value={name}
                                className="mb-3"
                                name="name"
                                onBlur={e => blurHandler(e)}
                                placeholder='Введите имя, фамилия...'
                            />
                            {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                            <Form.Control
                                onChange={e => emailHandler(e)}
                                value={email}
                                onBlur={e => blurHandler(e)}
                                name="email"
                                placeholder='E-mail...'
                            />
                            <DatePicker className="mt-3 mb-3" selected={selectedDate} onChange={date => setSelectedDate(date)}
                                        dateFormat='dd/MM/yyy' maxDate={new Date()}
                            />

                            {(phoneDirty && phoneError) && <div style={{color:'red'}}>{phoneError}</div>}
                            <Form.Control
                                onChange={e => phoneHandler(e)}
                                value={phone}
                                onBlur={e => blurHandler(e)}
                                name="phone"
                                placeholder='Введите номер телефона'
                            />
                            {(messageDirty && messageError) && <div style={{color:'red'}}>{messageError}</div>}
                            <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control value={message} name= "message" onChange={e => messageHandler(e)} onBlur={e => blurHandler(e)} placeholder='Поле для сообщения...' as="textarea" rows={4} />

                            </Form.Group>
                            <div>

                                <Button className='mt-3' onClick={click}  disabled={!formValid}  variant='outline-dark'> Отправить </Button>

                            </div>
                        </Form>
                    </Card>
                </Container>
            </form>
        </div>
    );
};

export default TestPage;