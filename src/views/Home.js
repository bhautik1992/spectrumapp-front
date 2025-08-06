import { Row, Col } from "reactstrap";
import { Helmet } from 'react-helmet-async';
import StatsCard from './StatsCard';
import { useState, useEffect } from 'react';
import axiosInstance from  '../helper/axiosInstance';
import toast from 'react-hot-toast'

const Home = () => {
    const [leadStatus, setLeadStatus] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get('home');
                
                if(response.data.success){
                    setLeadStatus(response.data.data);
                }
            } catch (error) {
                let errorMessage = import.meta.env.VITE_ERROR_MSG;
                
                if(error.response){
                    errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
                }else if (error.request){
                    errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
                }

                // console.error(error.message);
                toast.error(errorMessage);
            }
        })();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <Row>
                <Col lg='12' sm='12'>
                    <StatsCard leadStatus={leadStatus} />
                </Col>
            </Row>
        </div>
    );
};

export default Home;


