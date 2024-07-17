import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faBars } from "@fortawesome/free-solid-svg-icons";
import { getProductData } from "../api/index";
import { CardBox } from "../components/CardBox";
import { ProductData } from "../types/homeTypes";
import { OptionType } from "../types/filtersTypes";
import SelectDropdown from "../components/SelectDropdown";
import { Slider } from "@mui/material";

const WebsiteHome: React.FC = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [authorOptions, setAuthorOptions] = useState<OptionType[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<OptionType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  console.log(productData);

  const getData = async () => {
    const _data = await getProductData();

    setProductData(_data.BookData);

    // Extract unique authors and create options
    const uniqueAuthors: string[] = Array.from(
      new Set(_data.BookData.map((product: ProductData) => product.author))
    );
    const options = uniqueAuthors.map((author: string) => ({
      value: author,
      label: author,
    }));
    setAuthorOptions(options);

    // Extract unique categories and create options
    const uniqueCategories: string[] = Array.from(
      new Set(_data.BookData.map((product: ProductData) => product.category))
    );
    const categoryOptions = uniqueCategories.map((category: string) => ({
      value: category,
      label: category,
    }));
    setCategoryOptions(categoryOptions);

    // Determine min and max price for slider
    const prices = _data.BookData.map((product: ProductData) =>
      Number(product.price)
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange([minPrice, maxPrice]);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAuthorChange = (selectedOptions: OptionType[] | null) => {
    setSelectedAuthors(selectedOptions || []);
  };

  const handleCategoryChange = (newValue: OptionType[] | null) => {
    setSelectedCategories(newValue || []);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };
  return (
    <Layout>
      <section className="productlisting-sec">
        <Container>
          <Row className="justify-content-between">
            <Col lg={2}>
              <aside className="filterOptions">
                <h2>Filter Option</h2>

                <div className="filterform">
                  <h6>Shop by Author</h6>
                  <SelectDropdown
                    placeholder="Choose Authors"
                    isMulti={true}
                    value={selectedAuthors}
                    options={authorOptions}
                    onChange={handleAuthorChange}
                  />
                </div>
                <div className="filterform">
                  <h6>Shop by Categories</h6>
                  <SelectDropdown
                    placeholder="Choose Categories"
                    isMulti={true}
                    value={selectedCategories}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                  />
                </div>

                <div className="filterform">
                  <h6>Price Range</h6>
                  <Slider
                    value={priceRange}
                    min={priceRange[0]}
                    max={priceRange[1] + 300}
                    onChange={handlePriceChange}
                    // valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                  />
                  <div className="price-range-values">
                    <span>{priceRange[0]}</span> - <span>{priceRange[1]}</span>
                  </div>
                </div>
              </aside>
            </Col>
            <Col lg={9}>
              <div className="productGrid">
                <div className="head">
                  <h2>Books</h2>
                  <div className="innerFilter">
                    <ul className="filterbyDate">
                      <li className="active">
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
                      <li className="active">
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
                    productData
                      .filter(
                        (product) =>
                          selectedAuthors.length === 0 ||
                          selectedAuthors.some(
                            (author) => author.value === product.author
                          )
                      )
                      .filter(
                        (product) =>
                          selectedCategories.length === 0 ||
                          selectedCategories.some(
                            (category) => category.value === product.category
                          )
                      )
                      .filter(
                        (product) =>
                          Number(product.price) >= priceRange[0] &&
                          Number(product.price) <= priceRange[1]
                      )
                      .map((product, ind) => (
                        <div className="itemBox" key={ind}>
                          {product && <CardBox product={product} />}
                          <div className="reckBg" />
                        </div>
                      ))}
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
