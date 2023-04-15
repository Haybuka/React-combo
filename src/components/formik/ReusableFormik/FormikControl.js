import React from "react";
import Input from "./InputTypes/Input";
import TextArea from "./InputTypes/TextArea";
import Select from "./InputTypes/Select";
import Radio from "./InputTypes/Radio";
import CheckboxGroup from "./InputTypes/CheckboxGroup";
import Datepicker from "./InputTypes/Datepicker";

function FormikControl(props) {
  const { control,...rest } = props;
 
  switch (control) {
    case "input":
   return <Input {...rest}/>
    case "textarea":
      return <TextArea {...rest}/>
    case "select":
        return <Select {...rest}/>
    case "radio":
        return <Radio {...rest}/>
      break;
    case "checkbox":
      return <CheckboxGroup {...rest}/>
    case "date":
      return <Datepicker {...rest}/>

    default:
      return null;
  }
  return <div>FormikControl</div>;
}

export default FormikControl;
