import { Button, Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";

export default function ModalBlock(
    btnLabel: string,
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined = '5xl'
) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
            <Button onPress={onOpen}>{btnLabel}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
                <ModalContent>
                    <ModalBody></ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}