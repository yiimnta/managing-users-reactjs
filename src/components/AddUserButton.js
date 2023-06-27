import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

function AddUserButton({ onAddUser }) {

    const [show, setShow] = useState(false)
    const [user, setUser] = useState()

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    const [avatarIMG, setAvatarIMG] = useState()
    const avatarRef = useRef()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleAddAvatar = () => {
        avatarRef.current.click()
    }

    const handleChangeAvatar = () => {
        const file = avatarRef.current.files[0];
        file.review = URL.createObjectURL(file)
        setAvatarIMG(file)
    }

    const handleSubmit = () => {
        toast.info('🦄 Please wait...', {
            position: "top-right",
            autoClose: 2000,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        onAddUser({
            first_name: firstname,
            last_name: lastname,
            email,
            avatar: (avatarIMG ? avatarIMG.review : "")
        })

        handleClose()

        toast.success('🦄 Successfully', {
            position: "top-right",
            autoClose: 2000,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    // useEffect(() => {
    //     return () => {
    //         avatarIMG && URL.revokeObjectURL(avatarIMG.review)
    //     }
    // }, [avatarIMG])

    return (
        <React.Fragment>
            <Button style={{ background: "#712cf9", color: "#f0f8ff" }} onClick={handleShow}>
                Add New User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: "#712cf9", color: "#f0f8ff" }}>
                    <Modal.Title>Adding New User</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-add'>
                    <Form>
                        <Form.Group className="mb-3" controlId="add.firstname">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className='modal-add-label'>First Name</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className='modal-add-input'
                                            type="text"
                                            placeholder="First Name"
                                            autoFocus
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="add.lastname">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className='modal-add-label'>Last Name</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className='modal-add-input'
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="add.email">
                            <Container>
                                <Row>
                                    <Col xs={4} className='p-0'>
                                        <Form.Label className='modal-add-label'>Email</Form.Label>
                                    </Col>
                                    <Col className='p-0'>
                                        <Form.Control
                                            className='modal-add-input'
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="add.avatar"
                        >
                            <div className='d-flex flex-row align-items-center'>
                                <Form.Control type='file' accept='image/*' ref={avatarRef} className='d-none' onChange={handleChangeAvatar} />
                                <Button style={{ background: "#712cf9", color: "#f0f8ff", height: "fit-content" }} onClick={handleAddAvatar}>
                                    Click to add Avatar
                                </Button>
                                {avatarIMG && <img src={avatarIMG.review} alt="logo" height="100px" />}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ background: "#712cf9", color: "#f0f8ff" }} onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment>
    )
}

export default React.memo(AddUserButton)