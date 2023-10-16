import { AccrodionComponentProps } from "../../interfaces/components";

export default function AccordionComponent(props: AccrodionComponentProps) {
  return (
    <div>
      <div className="accordion-item">
        <h2 className="accordion-header" id={"headingOne"}>
          <button
            style={{
              ...props.headerStyle,
              color: props.titleColor,
              backgroundColor: props.headerStyle.backgroundColor || "#fff",
            }}
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${props.dataTarget}`}
            aria-expanded="true"
            aria-controls={`collapse-${props.dataTarget}`}
          >
            {props.title}
          </button>
        </h2>
        <div
          id={`collapse-${props.dataTarget}`}
          className="accordion-collapse collapse show"
          aria-labelledby={"headingOne"}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{props.child}</div>
        </div>
      </div>
    </div>
  );
}
