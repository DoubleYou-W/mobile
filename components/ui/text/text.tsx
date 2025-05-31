import { I18nManager, Text as TextPrimitive, type TextProps as TextPropsPrimitive } from "react-native";

// TODO: Break this down into variants & sizes
export type TextVariant =
  | "clean"

  | "info"
  | "info_clickable"

  | "section_header"
  | "subsection_header"
  | "subsection_option"

  | "paragraph_title"
  | "paragraph"

  | "page_title"
  | "page_subtitle"

  | "card_large_title"
  | "card_title"
  | "card_subtitle"
  | "card_section_title"
  | "card_text"
  | "card_attribute"

  | "input_label"
  
  | "button"
  
  | "error";

const variants: Record<TextVariant, string> = {
  clean: "",

  info: "text-primary-foreground text-xs font-interlight",
  info_clickable: "text-primary-foreground text-xs font-intersemibold",

  section_header: "text-primary-foreground text-xl font-intersemibold underline decoration-primary decoration-solid",
  subsection_header: "text-primary-foreground text-base font-intersemibold",
  subsection_option: "text-primary-foreground text-sm font-intermedium",

  paragraph_title: "text-primary-foreground text-sm font-interbold",
  paragraph: "text-primary-foreground text-xs font-interlight",

  page_title: "text-primary-foreground text-lg font-interbold",
  page_subtitle: "text-secondary-foreground text-sm font-interlight",

  card_large_title: "text-primary-foreground text-xl font-interbold",
  card_title: "text-primary-foreground text-base font-intersemibold",
  card_subtitle: "text-secondary-foreground text-xs font-interlight",
  card_section_title: "text-primary-foreground text-sm font-intersemibold",
  card_text: "text-primary-foreground text-xs font-interlight",
  card_attribute: "text-primary-foreground text-xs font-interregular",

  input_label: "text-primary-foreground text-xs font-intersemibold",

  button: "text-primary-foreground text-base font-intermedium",

  error: "text-destructive text-xs font-interlight",
};

export type TextProps = TextPropsPrimitive & {  
  variant: TextVariant;
};

export const Text = ({
  variant,

  children,
  ...props
}: TextProps) => {
  return (
    <TextPrimitive
      {...props}

      style={[{ writingDirection: I18nManager.isRTL ? "rtl" : "ltr" }, props.style]}

      className={`
        ${variants[variant]}
        ${props.className}
      `}
    >
      {children}
    </TextPrimitive>
  );
};