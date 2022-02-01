import { useEffect, useState } from 'react';
import dollar from '../images/icon-dollar.svg';
import person from '../images/icon-person.svg';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Calculator = () => {
    const validate = Yup.object().shape({
        bill: Yup.string()
            .min(2, "Bill must be at least 2 digits")
            .required("Bill cannot be zero"),
        customer: Yup.string()
            .min(1, "Customer must be at least 1 characters")
            .required("Customer cannot be zero"),
        tip: Yup.string()
            .min(3, "Tip must be selected")
            .required("Please select a percentage tip"),
    })
    const formik = useFormik({
        validationSchema: validate,
        initialValues:{
            bill: '',
            customer: '',
            tip: ''
        },
    })

    const [bills, setBill] = useState(0);
    const [customers, setCustomer] = useState(0);
    const [tips, setTip] = useState(0);
    // let oneTip = 0;
    // let oneTotal = 0;
    //console.log(formik.values.bill, formik.values.tip, formik.values.customer);
    //console.log(bills, tips, customers);

    useEffect(()=> {
        var rbill = parseFloat(formik.values.bill);
        var rtip = parseFloat(formik.values.tip);
        var rper = parseFloat(formik.values.customer);
        const totalTip = rbill * (rtip / 100);
        const tipOne = totalTip / rper;
        const billOne = rbill / rper;
        const totalOne = tipOne + billOne;
        setBill(Math.round((tipOne + Number.EPSILON) * 100) / 100);
        setTip(Math.round((totalOne + Number.EPSILON) * 100) / 100);
        console.log(tipOne, totalOne);
    }, [formik.values.bill, formik.values.tip, formik.values.customer]);

    const handleReset = () => {
        setBill(0);
        setCustomer(0);
        setTip(0);
    }

    return (
        <main className="main">
            <h1 className="main__header">spli<br/>tter</h1>
            
            <section className="main__calculator">
                <div className="main__calculator__form">
                    <h3 className="main__calculator__form__title">Bill</h3>
                    <div className='main__calculator__form__group'>
                        <img src={dollar} alt="Icon" className='main__calculator__form__group__dollar'/>
                        <input 
                            className="main__calculator__form__group__input" 
                            name='bill' 
                            placeholder='0' 
                            value={formik.values.bill} 
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='main__calculator__form__btn'>
                        <h3 className='main__calculator__form__btn__title'>Select tip %</h3>
                        <div className='main__calculator__form__button'>
                            <button type='button' value='5%' name='tip' onClick={(e)=>{formik.values.tip = e.target.value}}>5%</button>
                            <button type='button' value='10%' name='tip' onClick={(e)=>{formik.values.tip = e.target.value}}>10%</button>
                            <button type='button' value='15%' name='tip' onClick={(e)=>{formik.values.tip = e.target.value}}>15%</button>
                            <button type='button' value='25%' name='tip' onClick={(e)=>{formik.values.tip = e.target.value}}>25%</button>
                            <button type='button' value='50%' name='tip' onClick={(e)=>{formik.values.tip = e.target.value}}>50%</button>
                            <input type='text' placeholder='Custom' name='tip' onChange={formik.handleChange} value={formik.values.tip}/>
                        </div>
                    </div>
                    <h3 className="main__calculator__form__title">Number of People</h3>
                    <div className='main__calculator__form__group'>
                        <img src={person} alt="Icon" className='main__calculator__form__group__dollar'/>
                        <input className="main__calculator__form__group__input" name='customer' placeholder={customers} value={formik.values.customer} onChange={formik.handleChange}/>
                    </div>
                </div>
                <div className="main__calculator__reset">
                    <div className="main__calculator__reset__item">
                        <div className="main__calculator__reset__item__flex">
                            <h3 className='main__calculator__reset__amount'>Tip Amount</h3>
                            <h3 className='main__calculator__reset__person'>/ person</h3>
                        </div>
                        <input type='text' className='main__calculator__reset__input' placeholder='$0.00' value={bills} readOnly/>
                    </div>
                    <div className="main__calculator__reset__item">
                        <div className="main__calculator__reset__item__flex">
                            <h3 className='main__calculator__reset__amount'>Total</h3>
                            <h3 className='main__calculator__reset__person'>/ person</h3>
                        </div>
                        <input type='text' className='main__calculator__reset__input' placeholder='$0.00' value={tips} readOnly/>
                    </div>
                    <button type="reset" className='main__calculator__reset__btn' onClick={handleReset}>Reset</button>
                </div>
            </section>
            <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
                Coded by <a href="https://www.github.con/Barkty">Barkty</a>.
            </div>
        </main>
    );
}

export default Calculator;