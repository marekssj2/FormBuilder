import React, { Component } from "react";
import InputComponent from "./InputComponent";

class InputList extends Component {
  constructor() {
    super();
    this.idCounter = 0;
  }

  state = {
    inputList: []
  };

  createInputComponent = parentId => {
    const newId = this.idCounter++;
    const listArray = this.state.inputList;

    listArray.push({
      id: newId,
      question: "",
      type: "bool",
      children: [],
      parentId: parentId,
      condition: null,
      conditionValue: null
    });
    if (parentId !== null) {
      const partntIndex = listArray.findIndex(input => {
        return input.id === parentId;
      });
      listArray[partntIndex].children.push(newId);
    }

    this.setState({
      inputList: listArray
    });
    console.log(this.state);
  };

  updateInputComponent = (id, type, value) => {
    const listArray = this.state.inputList;
    listArray[id][type] = value;

    this.setState({
      inputList: listArray
    });
  };

  getDescendantIds = id => {
    const input = this.getInput(id);
    let ids = [id]; // Co właściwie daje to id wewnątrz listy? - [id]

    if (input.children.length > 0) {
      input.children.forEach(child => {
        ids = ids.concat(this.getDescendantIds(child));
      });
    }
    return ids; //zwracasz listę z id wszystkich inputów które są potomkami danego inputa
  };

  deleteInputComponent = id => {
    let inputList = this.state.inputList; //robimy kopię listy inputów
    const parentIndex = inputList.findIndex(input =>
      input.children.includes(id)
    ); // Co tu się dzieje? wiem że szukamy w liście z wszystkimi inputami indeksum, tylko co dzieje się w tej funkcji strzałkowej? , ale czy mógł byś troszeczkę to przybliżyć?

    this.getDescendantIds(id).forEach(id => {
      inputList = inputList.filter(input => input.id !== id);
    });

    if (parentIndex > -1) {
      const elementIndex = inputList[parentIndex].children.indexOf(id);
      inputList[parentIndex].children.splice(elementIndex, 1);
    }

    this.setState({
      inputList
    });
  };

  // deleteInputComponent = id => {
  //   const listArray = this.state.inputList;
  //   let curList = listArray.filter(item => item.id !== id);

  //   this.setState({
  //     inputList: curList
  //   });
  //   console.log(curList);
  // };

  getInput = id => {
    return this.state.inputList.find(item => item.id === id);
  };

  render() {
    const { inputList } = this.state;
    return (
      <div className="App">
        {inputList.map(item => {
          if (item.parentId === null) {
            return (
              <InputComponent
                input={item}
                key={item.id}
                createInput={this.createInputComponent}
                getInput={this.getInput}
                updateInputComponent={this.updateInputComponent}
                deleteInputComponent={this.deleteInputComponent}
              />
            );
          }
        })}
        <p>
          <button onClick={() => this.createInputComponent(null)}>
            Add Input
          </button>
        </p>
      </div>
    );
  }
}

export default InputList;
