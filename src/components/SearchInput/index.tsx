import { ComponentProps, forwardRef, ReactNode } from "react";

import { Input, TextInputContainer } from "./styles";

export interface SearchInputProps extends ComponentProps<typeof Input> {
  children: ReactNode;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ children, ...props }, ref) => {
    return (
      <TextInputContainer>
        <Input ref={ref} {...props} />
        {children}
      </TextInputContainer>
    );
  }
);

SearchInput.displayName = "SearchInput";
