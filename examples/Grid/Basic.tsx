import React from 'react';
import {Row, Col} from '../../src';

export default () => (
    <>
        <div style={{ marginBottom: 20 }}>
            <Row>
                <Col span={12}>
                    <div style={{
                        background: '#1677ff',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '16px 8px',
                        borderRadius: '6px',
                        minHeight: '40px'
                    }}>col-12
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{
                        background: '#1677ff',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '16px 8px',
                        borderRadius: '6px',
                        minHeight: '40px'
                    }}>col-12
                    </div>
                </Col>
            </Row>
        </div>
        <div>
            <Row>
                <Col span={8}>
                    <div style={{
                        background: '#1677ff',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '16px 8px',
                        borderRadius: '6px',
                        minHeight: '40px'
                    }}>col-8
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{
                        background: '#1677ff',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '16px 8px',
                        borderRadius: '6px',
                        minHeight: '40px'
                    }}>col-8
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{
                        background: '#1677ff',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '16px 8px',
                        borderRadius: '6px',
                        minHeight: '40px'
                    }}>col-8
                    </div>
                </Col>
            </Row>
        </div>
    </>
);
