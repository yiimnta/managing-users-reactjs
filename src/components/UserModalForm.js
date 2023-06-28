import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

function UserModalForm({ formName, buttonName, onAddUser, editUser, onEditUser }) {

    const [show, setShow] = useState(false)
    const [avatarIMG, setAvatarIMG] = useState()

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            avatar: undefined
        }
    })

    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState
    const avatarRef = useRef(null)
    const avatarReg = register("avatar")

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleAddAvatar = () => {
        avatarRef.current.click()
    }

    const handleChangeAvatar = () => {
        const file = avatarRef.current.files[0];
        setAvatarIMG(URL.createObjectURL(file))
    }

    const onSubmit = (data) => {
        onAddUser && onAddUser({
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            avatar: (avatarIMG ? avatarIMG : "")
        })

        onEditUser && onEditUser({
            id: editUser.id,
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            avatar: (avatarIMG ? avatarIMG : "")
        })

        reset()
        setAvatarIMG("")
        handleClose()

        toast.success('🦄 Successfully', {
            position: "top-right",
            autoClose: 2000,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    useEffect(() => {
        if (editUser) {
            setValue("firstname", editUser.first_name)
            setValue("lastname", editUser.last_name)
            setValue("email", editUser.email)
            setValue("avatar", editUser.avatar)
            setAvatarIMG(editUser.avatar)
        }
    }, [editUser, setValue])

    return (
        <React.Fragment>
            <Button style={{ background: "#712cf9", color: "#f0f8ff" }} onClick={handleShow}>
                {buttonName}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: "#712cf9", color: "#f0f8ff" }}>
                    <Modal.Title>{formName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-add'>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="firstname">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className={`modal-add-label ${errors.firstname ? "bg-error-color" : "bg-base-color"}`}>First Name</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className={`${errors.firstname ? "error-input" : "form-input"}`}
                                            type="text"
                                            placeholder="First Name"
                                            autoFocus
                                            {...register("firstname", {
                                                required: "First Name is required"
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Form.Control.Feedback className='d-block' type='invalid'>
                                    {errors.firstname?.message}
                                </Form.Control.Feedback>
                            </Container>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastname">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className={`modal-add-label ${errors.lastname ? "bg-error-color" : "bg-base-color"}`}>Last Name</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className={`${errors.lastname ? "error-input" : "form-input"}`}
                                            type="text"
                                            placeholder="Last Name"
                                            {...register("lastname", {
                                                required: "Last Name is required"
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Form.Control.Feedback className='d-block' type='invalid'>
                                    {errors.lastname?.message}
                                </Form.Control.Feedback>
                            </Container>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className={`modal-add-label ${errors.email ? "bg-error-color" : "bg-base-color"}`}>Email</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className={`${errors.email ? "error-input" : "form-input"}`}
                                            type="email"
                                            placeholder="name@example.com"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                    message: "Invalid email format"
                                                }
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Form.Control.Feedback className='d-block' type='invalid'>
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Container>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="add.avatar"
                        >
                            <div className='d-flex flex-row align-items-center'>
                                <Form.Control type='file' accept='image/*' className='d-none' {...avatarReg} ref={(e) => {
                                    avatarReg.ref(e)
                                    avatarRef.current = e
                                }} onChange={handleChangeAvatar} />
                                <Button style={{ background: "#712cf9", color: "#f0f8ff", height: "fit-content" }} onClick={handleAddAvatar}>
                                    Click to add Avatar
                                </Button>
                                {avatarIMG && <img src={avatarIMG} alt="logo" height="100px" className='mx-3' />}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ background: "#712cf9", color: "#f0f8ff" }} onClick={handleSubmit(onSubmit)} >
                        {buttonName}
                    </Button>
                </Modal.Footer>
            </Modal >
            <DevTool control={control} />
        </React.Fragment >
    )
}

export default React.memo(UserModalForm)