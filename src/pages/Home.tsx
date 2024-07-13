import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faBars } from "@fortawesome/free-solid-svg-icons";
import { getProductData } from "../api/index";
import { CardBox } from "../components/CardBox";
import { ProductData } from "../types/homeTypes";

const WebsiteHome: React.FC = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  console.log(productData);
  const getData = async () => {
    const _data = await getProductData();

    setProductData(_data.BookData);
  };
  useEffect(() => {
    getData();
  }, []);
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

                <div className="gridStart">
                  {productData?.length > 0 &&
                    productData?.map((product, ind) => {
                      return (
                        <div className="itemBox" key={ind}>
                          {product && <CardBox product={product} />}
                          <div className="reckBg" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default WebsiteHome;
