import { useDispatch } from "react-redux";
import { saveContentLength } from "@/redux/slices/ContentSlice";
import { useForm } from "react-hook-form";
import appConfig from "@/config/constants";
import { totalEmployeeResponse } from "@/types/interface";
import { useEffect } from "react";
import { UpdateTotalEmployeeApi, GetTotalEmployeeApi } from "@/apiEndpoints/employeeApi";
import { CgCloseR } from "react-icons/cg";
import Modal from "react-modal";
import FormInput from "@/components/elements/formInput";

interface EditTotal {
    isEditModalOpen: boolean;
    editModalTotal: totalEmployeeResponse | null;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTotal: React.Dispatch<React.SetStateAction<totalEmployeeResponse | undefined>>
}

const EditModal = (props: EditTotal) => {

    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            total: props.editModalTotal?.total
        },
    });

    const onSubmit = async (data: totalEmployeeResponse) => {
        const formData = new FormData();

        formData.append("total", data.total || "");

        await UpdateTotalEmployeeApi(
            formData
        );
        const updatedTotal = await GetTotalEmployeeApi();
        props.setTotal(updatedTotal);
        dispatch(
            saveContentLength({ contentLength: updatedTotal || 0 })
        );

        reset();
        props.setIsEditModalOpen(false);
    };

    useEffect(() => {
        reset({
            total: props.editModalTotal?.total
        });
    }, [props.editModalTotal, reset]);

    const closeEditModal = () => {
        props.setIsEditModalOpen(false);
    };

    return (
        <Modal
            isOpen={props.isEditModalOpen}
            onRequestClose={closeEditModal}
            ariaHideApp={false}
            contentLabel="Example Modal"
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
                content: {
                    width: "45%",
                    height: "55%",
                    margin: "auto",
                    borderRadius: "10px",
                    overflow: "auto",
                },
            }}
        >
            <div className="form-container">
                <h2 className="form-heading">Update Total Employee</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="create-category-form"
                >
                    <FormInput
                        label="Total Employee"
                        nameProp="total"
                        requiredProp="This field is required"
                        placeholder="Enter total employee"
                        control={control}
                        errors={errors}
                    />
                    <div>
                        <button className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
            <CgCloseR className="close-button" onClick={closeEditModal} />
        </Modal >
    )
}

export default EditModal;
