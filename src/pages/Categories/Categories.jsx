import React, { useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoriesAction';
import Loading from '../../components/Loading/Loading';
import { Card, Container, Table } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th {
    background-color: #007bff;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }

  td {
    text-align: center;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <>
      <MainLayout>
        <Container>
          <h2 className="my-4 text-center">Categories</h2>
          <Card>
            <Card.Body>
              <StyledTable striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </Card.Body>
          </Card>
        </Container>
      </MainLayout>
    </>
  );
};

export default Categories;
