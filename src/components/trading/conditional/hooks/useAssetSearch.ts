
import { useState } from "react";

export const useAssetSearch = () => {
  const [assetSearchOpen, setAssetSearchOpen] = useState(false);
  const [assetSearchTerm, setAssetSearchTerm] = useState("");

  return {
    assetSearchOpen,
    setAssetSearchOpen,
    assetSearchTerm,
    setAssetSearchTerm
  };
};
