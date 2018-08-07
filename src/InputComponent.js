import React, { Component } from "react";

class InputComponent extends Component {
  handleChange = event => {
    const { updateInputComponent } = this.props;
    const { id } = this.props.input;
    const { value } = event.target;

    updateInputComponent(id, event.target.name, value);
  };

  createCondition(input) {
    if (input.type === "bool") {
      return (
        <div style={{ width: "100%" }}>
          <select name="condition" onChange={this.handleChange}>
            <option value="equal">Equal</option>
          </select>

          <select name="conditionValue" onChange={this.handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      );
    } else if (input.type === "text") {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <select name="condition" onChange={this.handleChange}>
            <option value="contains">Contains</option>
            <option value="start">Start with</option>
            <option value="end">End with</option>
          </select>
          <input
            type="text"
            name="conditionValue"
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <select name="condition" onChange={this.handleChange}>
            <option value="equal">Equal</option>
            <option value="greater">Greater than</option>
            <option value="less">Less than</option>
          </select>
          <input
            type="num"
            name="conditionValue"
            onChange={this.handleChange}
          />
        </div>
      );
    }
  }

  render() {
    const {
      input,
      createInput,
      getInput,
      updateInputComponent,
      deleteInputComponent
    } = this.props;
    const { id, parentId, children } = input;

    return (
      <div>
        <fieldset>
          {parentId !== null ? (
            <label>
              Condition
              {this.createCondition(getInput(parentId))}
            </label>
          ) : (
            ""
          )}
          <label>
            Question
            <input
              type="text"
              placeholder="Question"
              name="question"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Type
            <select onChange={this.handleChange} name="type">
              <option value="bool">Yes/ No</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
          </label>

          <button onClick={() => createInput(id)}>Add Sub-Input</button>
          <button
            onClick={() => deleteInputComponent(id)}
            style={{ marginLeft: "10px" }}
          >
            {" "}
            Delete input
          </button>

          {children.map(inputId => {
            const input = getInput(inputId);
            return (
              <InputComponent
                input={input}
                key={inputId}
                createInput={createInput}
                getInput={getInput}
                updateInputComponent={updateInputComponent}
                deleteInputComponent={deleteInputComponent}
              />
            );
          })}
        </fieldset>
      </div>
    );
  }
}

export default InputComponent;
