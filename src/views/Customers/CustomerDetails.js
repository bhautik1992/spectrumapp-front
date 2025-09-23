import { Button, Row, Col, Label } from 'reactstrap'
import { leadSourceLabels, leadStatusOptions, leadStatusLabels } from '../../constants';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Mail, Phone, User, ArrowLeft, ArrowRight } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Badge } from 'reactstrap'

const MySwal = withReactContent(Swal);

const CustomerDetails = ({ stepper, info, values, setFieldValue, handleSubmit, setOpen }) => {

    const handleLeadStatusChange = (option) => {
        setFieldValue("lead_status", option.value);

        if (option.value === 3) {
            MySwal.fire({
                icon: 'warning',
                text: "Changing lead status to Closed – Converted will convert the lead into a contact and the customer into a company. This action cannot be undone.",
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            })
        }
    };

    return (
        <>
            <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <div className="avatar bg-light-primary me-1">
                            <User size={20} />
                        </div>

                        <div>
                            <h5 className="mb-0">{`${info.lead_first_name} ${info.lead_last_name}`}</h5>
                        </div>
                    </div>

                    <Badge color="secondary" className='badge-sm' pill>
                        {info.lead_company}
                    </Badge>
                </div>

                <Row className="mb-2">
                    <Col md="6" sm="12" className="mb-2">
                        <h6 className="mb-1"><strong>Contact Info</strong></h6>

                        <p className="mb-1 d-flex align-items-center">
                            <Mail size={14} className="me-50 text-primary" />
                            {info.lead_email}
                        </p>

                        <p className="mb-1 d-flex align-items-center">
                            <Phone size={14} className="me-50 text-success" />
                            {info.lead_phone}
                        </p>
                    </Col>

                    <Col md="6" sm="12" className="mb-2">
                        <h6 className="mb-1"><strong>Identifiers</strong></h6>
                        
                        <p className="mb-1">
                            <strong>Shopify Customer Id:</strong> {info.shopify_cus_id}
                        </p>

                        {/* <p className="mb-1">
                            <strong>Salesforce Lead Id:</strong> {info.salesforce_lead_id}
                        </p> */}
                    </Col>
                </Row>

                <hr />

                <Row className='mt-2'>
                    <Col md="6" sm="12" className="mb-2">
                        <h6 className="mb-1"><strong>Lead Info</strong></h6>
                        <p className="mb-0">
                            Lead Source: {leadSourceLabels[info.lead_source] || "Unknown"}
                        </p>
                    </Col>

                    <Col md="6" sm="12" className="mb-2">
                        <h6 className="mb-1"><strong>Lead Status</strong></h6>

                        {(values.isClosedConverted)?
                            <Badge color="success" className='badge-sm' pill>
                                {leadStatusLabels[values.lead_status] || 'Unknown'}
                            </Badge>
                        :
                            <Select
                                name="lead_status"
                                id="lead_status"
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                options={leadStatusOptions}
                                value={leadStatusOptions.find(
                                    (opt) => opt.value === values.lead_status
                                )}
                                // onChange={(option) => setFieldValue("lead_status", option.value)}
                                onChange={handleLeadStatusChange}
                            />
                            }
                    </Col>
                </Row>
            </div>

            <div className="d-flex mt-4">
                {values.isClosedConverted ?
                    <Button color="secondary" className="btn-submit" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    :
                    <Button color="success" className="btn-submit" onClick={handleSubmit}>
                        Save & Exit
                    </Button>
                }

                <div className="ms-auto d-flex gap-1">
                    <Button color="primary" onClick={() => stepper.next()}>
                        <div className="align-middle d-sm-inline-block d-none">Next</div>
                        <ArrowRight size={14} className="rotate-rtl align-middle ms-sm-50 ms-0" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CustomerDetails;


