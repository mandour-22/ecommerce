import { Form } from "react-bootstrap";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

type inputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const input = <TFieldValue extends FieldValues>({
  label,
  name,
  register,
  error,
  type,
  onBlur,
  formText,
  success,
  disabled,
}: inputProps<TFieldValue>) => {
  const onBlurhandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={onBlurhandler}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        disabled={disabled}
      />
      <Form.Control.Feedback type={"invalid"}>{error}</Form.Control.Feedback>
      <Form.Control.Feedback type={"valid"}>{success}</Form.Control.Feedback>
      {formText && <Form.Text className="fw-bold">{formText}</Form.Text>}
    </Form.Group>
  );
};

export default input;
