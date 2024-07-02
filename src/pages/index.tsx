import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faBars } from "@fortawesome/free-solid-svg-icons";
const WebsiteHome: React.FC = () => {
  return (
    <Layout>
      <section className="productlisting-sec">
        <Container>
          <Row className="justify-content-between">
            <Col lg={2}>
              <aside className="filterOptions">
                <h2>Filter Option</h2>
              </aside>
            </Col>
            <Col lg={9}>
              <div className="productGrid">
                <div className="head">
                  <h2>Books</h2>
                  <div className="innerFilter">
                    <ul className="filterbyDate">
                      <li>
                        <button>Today</button>
                      </li>
                      <li>
                        <button>This Week</button>
                      </li>
                      <li>
                        <button>This Month</button>
                      </li>
                    </ul>
                    <ul className="ViewChangeList">
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faBorderAll} />
                        </button>
                      </li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faBars} />
                        </button>
                      </li>
                      <li>Newest</li>
                    </ul>
                  </div>
                </div>

                <div className="gridStart"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default WebsiteHome;
