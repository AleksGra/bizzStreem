import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, setDataRedux } from "../redux/reducers/documentInfoReducer";
import layout from "../data/layout.json";
import definition from "../data/definition.json";
import { useForm } from "react-hook-form";

const DocumentInfo = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const [dataDefinition, setDataDefinition] = useState({});
  useEffect(() => {
    dispatch(setDataRedux(layout, definition));
  }, [layout, definition]);
  const { documentLayout, documentDefinition } = useSelector(
    (state) => state.documentInfo
  );
  useEffect(() => {
    setDataDefinition(documentDefinition);
  }, [documentDefinition]);
  const handleChangeInput = (e, column) => {
    e.preventDefault();
    const schema = dataDefinition.schema;
    schema.fields.find((field) => field._id === column.fieldId)["value"] =
      e.target.value;
    setDataDefinition((prevData) => ({
      ...prevData,
      schema: schema,
    }));
  };
  const handleSaveInput = (data) => {
    if (!/^[0-9]+$/.test(data.age) || !/[A-Za-z]{3}/.test(data.name)) {
      alert(
        "In name input must be english letters >3  and age input must be numbers > 0"
      );
      reset();
    } else {
      dispatch(actions.saveDocumentData(data));
    }
  };

  return Object.keys(documentLayout).length !== 0 &&
    Object.keys(dataDefinition).length !== 0 ? (
    <div className="container-fluid d-flex h-100 justify-content-center align-items-center p-0">
      <form onSubmit={handleSubmit(handleSaveInput)}>
        <div className="row bg-white shadow-sm">
          <div className="col border rounded p-4"></div>
          <table className="table table-bordered table-striped table-highlight table-responsive">
            <tbody>
              {documentLayout.header.rows.map((row, index) => (
                <tr key={index}>
                  {row.columns.map((column) => {
                    let renderInput = dataDefinition.schema.fields.find(
                      (field) => field._id === column.fieldId
                    );
                    return (
                      renderInput && (
                        <td key={column.fieldId}>
                          <label
                            htmlFor="formControlInput"
                            className="form-label text-center"
                          >
                            {renderInput.label}
                            <input
                              {...register(`${renderInput.name}`, {
                                required: "All input required",
                              })}
                              className="form-control"
                              type={renderInput.type}
                              value={renderInput.value || ""}
                              onChange={(e) => handleChangeInput(e, column)}
                            />
                          </label>
                          <div
                            style={{
                              height: 40,
                              color: "red",
                            }}
                          >
                            {errors?.age && (
                              <p>{errors?.age?.message || "ERROR"}</p>
                            )}
                            {errors?.name && (
                              <p>{errors?.name?.message || "ERROR"}</p>
                            )}
                          </div>
                        </td>
                      )
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button
              disabled={!isValid}
              type={"submit"}
              className="btn btn-outline-primary  "
              //       onClick={(e) => handleSaveInput(e, dataDefinition)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div>There is no information...</div>
  );
};

export default DocumentInfo;
