import React from "react";
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Cart from "../components/cart/";
import AppContext from "../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  Alert
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Restaurants() {
  const appContext = useContext(AppContext);
  const { isAuthenticated } = appContext;
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  console.log("Restaurants -> appContext", appContext)

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant) {
    const { restaurant } = data;
    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    disabled={isAuthenticated === false}
                  >
                    + Add To Cart
                  </Button>
                  <p><br /></p>
                  {
                    isAuthenticated === false && (<>
                      <Alert color="danger">
                        Please<a href="/login"> sign-in </a>
                      </Alert>
                    </>)
                  }


                  <style jsx>
                    {`
                      p {
                        margin : 0
                      }
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
          {
            appContext.isAuthenticated === true && (
              <Col xs="3" style={{ padding: 0 }}>
                <Cart />
              </Col>
            )
          }
        </Row>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}
export default Restaurants;