/** @jsx jsx */

import { useEffect, useState  , forwardRef } from "react";
import { Container  , Row , Form , Button } from "react-bootstrap";
import { css , jsx } from '@emotion/react';
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import { loadingState } from "../lib/recoil-atoms";

const formStyle = css`
    width: 50vw;
`;



function AddIncident() {

    const [loading , setLoading] = useRecoilState(loadingState);
    const [customers , setCustomers] = useState([]);
    const [form , setForm] = useState({
        customerId: "" ,
        incidentDetail: "",
        incidentDate: new Date() ,
        status: ""
    })
    const [submit , setSubmit] = useState(false);
    

    const setValue = (key ,value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    useEffect(()=>{
        const fetchCustomers = async() => {
            
            const res = await fetch('https://60363d9bc3d42700172e672d.mockapi.io/api/v1/customer')
            const json = await res.json();
            // console.log('fetch customer' ,json)
            setCustomers(json);
        }
        fetchCustomers();
        return () => {
            setCustomers([]);
        }
    },[])

    useEffect(()=>{
        const postIncident = async() => {
            try {
                setLoading(true);
                let res = await fetch('https://60363d9bc3d42700172e672d.mockapi.io/api/v1/incident' , {
                    method: 'POST' ,
                    headers: {
                        'Content-Type' : 'application/json'
                    } ,
                    body: JSON.stringify({...form})
                });
                let json = await res.json();
                setLoading(false);
                setSubmit(false);
                alert('success');
                window.location.href = '/';
            }catch(error) {
                setLoading(false);
                setSubmit(false);
                console.log(error.message);
                alert('failed');
            }
        }

        if(submit) {
            // console.log(form);
            postIncident();
        }
    },[submit])

    const DatePickerCustom = forwardRef(({ children, onChange , value }, ref) => {
        return (
            <DatePicker 
                wrapperClassName="form-control" 
                className="form-control" 
                onChange={onChange} 
                selected={value} 
            />
        )
    });



    return (
        <Container>
            <Row className="justify-content-md-center">
             
                <Form css={formStyle}>
                    <Form.Group>
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as="select" onChange={(event)=>setValue('customerId' , event.target.value)}>
                            {
                                customers.map((item)=>(
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Detail</Form.Label>
                        <Form.Control as="textArea" placeholder="Detail of incident" onChange={(event)=>setValue('incidentDetail' , event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control as={DatePickerCustom} value={form.incidentDate} onChange={(value)=>setValue('incidentDate' , value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" onChange={(event)=>setValue('status' , event.target.value)}>
                           <option value="normal">Normal</option>
                           <option value="urgent">Urgent</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Button disabled={submit} variant="primary" type="button" onClick={()=>setSubmit(true)}>
                        Submit
                    </Button>
                </Form>
            
            </Row>

        </Container>
    )
}

export default AddIncident;