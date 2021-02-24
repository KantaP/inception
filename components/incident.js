import { useEffect, useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { loadingState } from '../lib/recoil-atoms';

import {
    Container,
    Table,
    Col,
    Row
} from 'react-bootstrap';

import moment from 'moment';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ListIncidentPage(props) {

    const [loading, setLoading] = useRecoilState(loadingState)
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState("incidentDate_desc");

    const memoValue = () =>
        list
            .sort((a, b) => {
                if (filter === 'status_asc') {
                    if (a.status > b.status) {
                        return 1;
                    }
                    if (a.status < b.status) {
                        return -1;
                    }
                    return 0;
                }
                else if (filter === 'status_desc') {
                    if (a.status < b.status) {
                        return 1;
                    }
                    if (a.status > b.status) {
                        return -1;
                    }
                    return 0;
                }
                else if (filter === 'incidentDate_asc') {
                    let dateA = moment(a.incidentDate);
                    let dateB = moment(b.incidentDate);
                    return dateA.valueOf() - dateB.valueOf();
                }
                else if (filter === 'incidentDate_desc') {
                    let dateA = moment(a.incidentDate);
                    let dateB = moment(b.incidentDate);
                    return dateB.valueOf() - dateA.valueOf();
                }
            });

    useEffect(() => {
        console.log(memoValue);
        const fetchListIncident = async () => {
            try {
                setLoading(true);
                let response = await fetch('https://60363d9bc3d42700172e672d.mockapi.io/api/v1/incident');
                let json = await response.json();
                for (let data of json) {
                    const cusRes = await fetch('https://60363d9bc3d42700172e672d.mockapi.io/api/v1/customer/' + data.customerId)
                    const cusJson = await cusRes.json();
                    let customer = cusJson || null;
                    data.customer = customer;
                }
                setList(json);
                setTimeout(() => setLoading(false), 1000);
            } catch (error) {
                setList([]);
                setLoading(false);
                alert(error.message);
            }
        }
        fetchListIncident();
        return () => {
            setList([]);
        }
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Table striped bordered responsive="lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Incident Detail</th>
                            <th onClick={() => {
                                if (filter === 'status_asc') setFilter('status_desc');
                                else if (filter === 'status_desc') setFilter('status_asc');
                                else setFilter('status_asc');
                            }}>
                                Status
                            </th>
                            <th onClick={() => {
                                if (filter === 'incidentDate_asc') setFilter('incidentDate_desc');
                                else if (filter === 'incidentDate_desc') setFilter('incidentDate_asc');
                                else setFilter('incidentDate_asc');
                            }}>
                                Incident At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            memoValue().map((item) => (
                                <tr>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {
                                            item.customer !== null &&
                                            (
                                                <Col>
                                                    <small>
                                                        {item.customer.name}
                                                    </small>
                                                </Col>
                                            )
                                        }

                                    </td>
                                    <td>
                                        {item.incidentDetail}
                                    </td>
                                    <td>
                                        {item.status}
                                    </td>
                                    <td>
                                        {moment(item.incidentDate).format('DD/MM/YYYY')}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Row>

        </Container>
    )
}


export default ListIncidentPage;