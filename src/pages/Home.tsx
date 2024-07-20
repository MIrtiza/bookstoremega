import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/store";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { WindowOutlined, LineStyleOutlined, Filter } from "@mui/icons-material";
import { getProductData } from "../api/index";
import { CardBox } from "../components/CardBox";
import { ProductData } from "../types/homeTypes";
import { OptionType } from "../types/filtersTypes";
import SelectDropdown from "../components/SelectDropdown";
import { Slider } from "@mui/material";
import { ActionMeta, MultiValue, SingleValue } from "react-select";

const WebsiteHome: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [authorOptions, setAuthorOptions] = useState<OptionType[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<
    MultiValue<OptionType>
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<OptionType>
  >([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const [showFilterMob, setShowFilterMob] = useState(false);

  const handleShowFilter = () => {
    setShowFilterMob(!showFilterMob);
  };

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

  const handleAuthorChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue === null || !Array.isArray(newValue)) {
      setSelectedAuthors([]);
    } else {
      setSelectedAuthors(newValue as MultiValue<OptionType>);
    }
  };

  const handleCategoryChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue === null || !Array.isArray(newValue)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(newValue as MultiValue<OptionType>);
    }
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setPriceRange(newValue as [number, number]);
  };

  const filteredProducts = productData
    .filter(
      (product) =>
        searchTerm === "" ||
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedAuthors.length === 0 ||
        selectedAuthors.some((author) => author.value === product.author)
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
    );
  return (
    <Layout>
      <section className="productlisting-sec">
        <Container>
          <Row className="justify-content-between g-0">
            <Col lg={2}>
              <div className="filterSideWrap">
                <button
                  className="btn btn-purple d-block  d-lg-none d-xl-none"
                  onClick={handleShowFilter}
                >
                  Filters <Filter />
                </button>
                <aside
                  className={`filterOptions  ${showFilterMob ? "active" : ""}`}
                >
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
                      aria-labelledby="range-slider"
                    />
                    <div className="price-range-values">
                      <span>{priceRange[0]}</span> -{" "}
                      <span>{priceRange[1]}</span>
                    </div>
                  </div>
                </aside>
              </div>
            </Col>
            <Col lg={9}>
              <div className="productGrid">
                <div className="head">
                  <h2>Books</h2>
                  <div className="innerFilter">
                    <ul className="filterbyDate">
                      <li className="active">
                        <button>All</button>
                      </li>
                      <li>
                        <button>Today</button>
                      </li>
                      <li>
                        <button>This Month</button>
                      </li>
                    </ul>
                    <ul className="ViewChangeList">
                      <li className="active">
                        <button>
                          <WindowOutlined />
                        </button>
                      </li>
                      <li>
                        <button>
                          <LineStyleOutlined />
                        </button>
                      </li>
                      <li>Newest</li>
                    </ul>
                  </div>
                </div>

                <div className="gridStart">
                  {filteredProducts.length > 0 &&
                    filteredProducts.map((product, ind) => (
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
