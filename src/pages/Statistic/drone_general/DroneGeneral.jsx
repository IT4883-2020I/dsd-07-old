import React, { useEffect, useState } from "react";
import CustomTimeline from "./CustomTimeline";
import { Breadcrumb, Row, Col, Input } from 'antd';
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'

const { Search } = Input

export const DroneGeneral = () => {
    const [startDate, setStartDate] = useState(moment().toDate())
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toDate())
    const [currentSuperviseCode, setCurrentSuperviseCode] = useState('');
    const [currentDroneCode, setCurrentDroneCode] = useState('');

    useEffect(() => {
        console.log(moment(startDate).format(), moment(endDate).format())
    }, [startDate, endDate])

    const onSearch = value => {
        console.log(value, startDate, endDate)
    };

    return (
        <div>
            <Breadcrumb
                style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
            >
                <Breadcrumb.Item>Báo cáo thống kê</Breadcrumb.Item>
                <Breadcrumb.Item>Drone Tổng quan</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col span={4}>
                    <div>Khoảng thời gian</div>
                </Col>
                <Col span={4}>
                    <DateTimePicker
                        onChange={(value) => setStartDate(value)}
                        value={startDate}
                        format="dd/MM/yyyy"
                    />
                </Col>
                <Col span={4}>
                    <DateTimePicker
                        onChange={(value) => {
                            if (moment(value).isSame(moment(startDate))) return;
                            if (moment.duration(moment(value).diff(moment(startDate))).asDays() < 9) {
                                setEndDate(value)
                                return;
                            }
                            setEndDate(moment(startDate).add(8, 'day').toDate())
                        }}
                        value={endDate}
                        format="dd/MM/yyyy"
                    />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col span={4}>
                    <div>Mã giám sát</div>
                </Col>
                <Col span={4}>
                    <Search placeholder="Nhập mã giám sát" value={currentSuperviseCode} onSearch={onSearch} style={{ width: 200 }} />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col span={4}>
                    <div>Mã drone</div>
                </Col>
                <Col span={4}>
                    <Search placeholder="Nhập mã drone" value={currentDroneCode} onSearch={onSearch} style={{ width: 200 }} />
                </Col>
            </Row>

            <div style={{ marginTop: '250px' }}>
                <CustomTimeline startDate={startDate} endDate={endDate} />
            </div>
        </div>
    )
};