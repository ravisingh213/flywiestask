import React, { useState } from "react";
import * as yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  languages: yup.array().of(yup.string().required("Language is required")),
  // Add validation rules for other fields
});

export default function NewLawyer({ modal, setModal }) {
  const [loader, setLoader] = useState(false);
  const toggle = () => setModal(!modal);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Call Create New Lawyer api
  const onSubmit = async (data) => {
    setLoader(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((value, index) => {
          formData.append(`${key}[${index}]`, value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZlMTc4MjMyMzIwNmVmMjViOWJiOSIsImlhdCI6MTcwMDk2OTEzMSwiZXhwIjoxNzAxMjI4MzMxfQ.uq_XPlMmdPMGrFIvltPi3sHehK6qyKDj_JXv9eYKbm0"; // Replace 'YOUR_AUTH_TOKEN' with your actual authorization token
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
      const response = await fetch(
        "https://shlok-mittal-lawyer-backend.vercel.app/api/v1/admin/CreateLawyer",
        config
      );
      const responseData = await response.json();
      alert(responseData.message);
      setLoader(false);
      setModal(false);
      // Handle success or show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show an error message
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle} className="border-bottom">
          <h3>Add New Lawyer</h3>
          <p>Fill Details Of New Lawyer</p>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="fullName">Full Name</Label>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Jhon"
                        invalid={!!errors.fullName}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <FormFeedback>{errors.fullName.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="abc@gmail.com"
                        invalid={!!errors.email}
                      />
                    )}
                  />
                  {errors.email && (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="6306868530"
                        invalid={!!errors.phone}
                      />
                    )}
                  />
                  {errors.phone && (
                    <FormFeedback>{errors.phone.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="abc123"
                        invalid={!!errors.password}
                      />
                    )}
                  />
                  {errors.password && (
                    <FormFeedback>{errors.password.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="firstLineAddress">First Line Address</Label>
                  <Controller
                    name="firstLineAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="12 chak"
                        invalid={!!errors.firstLineAddress}
                      />
                    )}
                  />
                  {errors.firstLineAddress && (
                    <FormFeedback>
                      {errors.firstLineAddress.message}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="secondLineAddress">Second Line Address</Label>
                  <Controller
                    name="secondLineAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="nehru nagar"
                        invalid={!!errors.secondLineAddress}
                      />
                    )}
                  />
                  {errors.secondLineAddress && (
                    <FormFeedback>
                      {errors.secondLineAddress.message}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="usa"
                        invalid={!!errors.country}
                      />
                    )}
                  />
                  {errors.country && (
                    <FormFeedback>{errors.country.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="state">State</Label>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="New York"
                        invalid={!!errors.state}
                      />
                    )}
                  />
                  {errors.state && (
                    <FormFeedback>{errors.state.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="district">District</Label>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="manhattan"
                        invalid={!!errors.district}
                      />
                    )}
                  />
                  {errors.district && (
                    <FormFeedback>{errors.district.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="pincode">Pincode</Label>
                  <Controller
                    name="pincode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="20002"
                        invalid={!!errors.pincode}
                      />
                    )}
                  />
                  {errors.pincode && (
                    <FormFeedback>{errors.pincode.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="languages[0]">Language 0</Label>
                  <Controller
                    name="languages[0]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.languages?.[0]} />
                    )}
                  />
                  {errors.languages?.[0] && (
                    <FormFeedback>{errors.languages[0].message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="languages[1]">Language 2</Label>
                  <Controller
                    name="languages[1]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.languages?.[1]} />
                    )}
                  />
                  {errors.languages?.[1] && (
                    <FormFeedback>{errors.languages[1].message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="barCertificateNo">BarCertificate No</Label>
                  <Controller
                    name="barCertificateNo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.barCertificateNo} />
                    )}
                  />
                  {errors.barCertificateNo && (
                    <FormFeedback>
                      {errors.barCertificateNo.message}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="barCertificate">BarCertificate</Label>
                  <Controller
                    name="barCertificate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.barCertificate} />
                    )}
                  />
                  {errors.barCertificate && (
                    <FormFeedback>{errors.barCertificate.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="categoryId[0]">CategoryId[0]</Label>
                  <Controller
                    name="categoryId[0]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.categoryId?.[0]} />
                    )}
                  />
                  {errors.categoryId?.[0] && (
                    <FormFeedback>{errors.categoryId[0].message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="categoryId[1]">categoryId[1]</Label>
                  <Controller
                    name="categoryId[1]"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.categoryId?.[1]} />
                    )}
                  />
                  {errors.categoryId?.[1] && (
                    <FormFeedback>{errors.categoryId[1].message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="experiance">Experiance</Label>
                  <Controller
                    name="experiance"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        invalid={!!errors.experiance}
                      />
                    )}
                  />
                  {errors.experiance && (
                    <FormFeedback>{errors.experiance.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="barRegistrationImage">
                    BarRegistration Image
                  </Label>
                  <Controller
                    name="barRegistrationImage"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                      <Input
                        {...field}
                        type="file"
                        value={value?.fileName}
                        onChange={(event) => {
                          onChange(event.target.files[0]);
                        }}
                        invalid={!!errors.barRegistrationImage}
                      />
                    )}
                  />
                  {errors.barRegistrationImage && (
                    <FormFeedback>
                      {errors.barRegistrationImage.message}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="barCertificateImage">BarCertificate Image</Label>
                  <Controller
                    name="barCertificateImage"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                      <Input
                        {...field}
                        type="file"
                        value={value?.fileName}
                        onChange={(event) => {
                          onChange(event.target.files[0]);
                        }}
                        invalid={!!errors.barCertificateImage}
                      />
                    )}
                  />
                  {errors.barCertificateImage && (
                    <FormFeedback>
                      {errors.barCertificateImage.message}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label for="aadhar">aadhar</Label>
                  <Controller
                    name="aadhar"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                      <Input
                        {...field}
                        type="file"
                        value={value?.fileName}
                        onChange={(event) => {
                          onChange(event.target.files[0]);
                        }}
                        invalid={!!errors.aadhar}
                      />
                    )}
                  />
                  {errors.aadhar && (
                    <FormFeedback>{errors.aadhar.message}</FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {loader ? (
                <div class="text-center">
                  <div
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                </div>
              ) : (
                "Save"
              )}
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
