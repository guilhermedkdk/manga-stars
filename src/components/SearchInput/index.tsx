import { forwardRef, ReactNode } from "react";

import { Input, TextInputContainer } from "./styles";

export interface SearchInputProps {
  children: ReactNode;
  size?: "sm" | "md";
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ children, size, ...props }, ref) => {
    return (
      <TextInputContainer size={size}>
        <Input ref={ref} {...props} />
        {children}
      </TextInputContainer>
    );
  }
);

SearchInput.displayName = "SearchInput";
