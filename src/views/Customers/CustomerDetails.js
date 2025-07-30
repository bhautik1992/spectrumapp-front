import { Button, Row, Col, Label } from 'reactstrap'
import { leadSourceLabels, leadStatusOptions } from '../../constants';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'

const CustomerDetails = ({ stepper, info, values, setFieldValue, handleSubmit }) => {
    return(
        <>
            <Row>
                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='nameMulti'>
                        <h6>Shopify Customer Id</h6>
                    </Label>
                    <h6>{info.shopify_cus_id}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Salesforce Lead Id</h6>
                    </Label>
                    <h6>{info.salesforce_lead_id}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Name</h6>
                    </Label>
                    <h6>{`${info.lead_first_name} ${info.lead_last_name}`}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Company</h6>
                    </Label>
                    <h6>{info.lead_company}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Email</h6>
                    </Label>
                    <h6>{info.lead_email}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Phone</h6>
                    </Label>
                    <h6>{info.lead_phone}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Lead Source</h6>
                    </Label>
                    <h6>{leadSourceLabels[info.lead_source] || "Unknown"}</h6>
                </Col>

                <Col md='3' sm='12' className='mb-1'>
                    <Label className='form-label' for='lastNameMulti'>
                        <h6>Select Lead Status</h6>
                    </Label>
                    
                    <Select
                        name="lead_status"
                        id="lead_status"
                        theme={selectThemeColors}
                        className={`react-select`}
                        classNamePrefix='select'
                        options={leadStatusOptions}
                        value={leadStatusOptions.find(opt => opt.value === values.lead_status)}
                        onChange={(option) => setFieldValue("lead_status", option.value)}
                    />
                </Col>
            </Row>

            <div className="d-flex mt-2">
                <Button color='secondary' outline disabled>
                    <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
                    <div className='align-middle d-sm-inline-block d-none'>Previous</div>
                </Button>

                <div className="ms-auto d-flex gap-1">
                    <Button color='success' className='btn-submit' onClick={handleSubmit}>
                        Save & Exit
                    </Button>

                    <Button color='primary' onClick={() => stepper.next()}>
                        <div className='align-middle d-sm-inline-block d-none'>Next</div>
                        <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CustomerDetails;


