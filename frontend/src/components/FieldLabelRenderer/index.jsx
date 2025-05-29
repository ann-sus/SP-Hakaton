import DynamicTextLabelParagraph from "../DynamicTextLabelParagraph";
import "./style.css";

function FieldLabelRenderer({ dynamicFieldLabels }) {
  return (
    <div className="dynamic-field-label-container">
      {dynamicFieldLabels.map((data, index) => {
        return <DynamicTextLabelParagraph {...data} key={index} />;
      })}
    </div>
  );
}

export default FieldLabelRenderer;
