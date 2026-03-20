import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as invoiceApi from "../invoice.api";

const PROFORMA_KEY  = "proformaInvoices";
const TAX_KEY       = "taxInvoices";
// ── KEY FIX: also invalidate the parent postSales query so the parent
// component (which passes invoices as a prop) also refetches fresh data.
const POST_SALES_KEY = "postSales";

// ═══════════════════════════════════════════════════════
// PROFORMA INVOICE HOOKS
// ═══════════════════════════════════════════════════════

export const useProformasByPostSales = (postSalesId) => {
  return useQuery({
    queryKey: [PROFORMA_KEY, postSalesId],
    queryFn: () =>
      invoiceApi
        .getProformasByPostSales(postSalesId)
        .then((res) => res.data.data),
    enabled: !!postSalesId,
  });
};

export const useProformaById = (id) => {
  return useQuery({
    queryKey: [PROFORMA_KEY, "single", id],
    queryFn: () =>
      invoiceApi.getProformaById(id).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useCreateProforma = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postSalesId, data }) =>
      invoiceApi.createProforma(postSalesId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY, variables.postSalesId] });
      // Invalidate parent so the invoice list in PostSalesDetail updates too
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useUpdateProforma = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => invoiceApi.updateProforma(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

// ── MARK SENT ──────────────────────────────────────────────────────────────────
export const useMarkProformaSent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.markProformaSent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY] });
      // Invalidate postSales so parent component gets fresh invoice list
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

// ── MARK PAID ──────────────────────────────────────────────────────────────────
// This is the one that wasn't syncing — it was only invalidating [PROFORMA_KEY]
// but the parent reads from [POST_SALES_KEY]. Now invalidates both.
export const useMarkProformaPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.markProformaPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY] });
      // ✅ FIX: parent PostSalesDetail uses postSales query — must invalidate it
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

// ── CONVERT TO TAX ─────────────────────────────────────────────────────────────
// Same issue — needed [POST_SALES_KEY] invalidation
export const useConvertToTaxInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (proformaId) => invoiceApi.convertToTaxInvoice(proformaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY] });
      queryClient.invalidateQueries({ queryKey: [TAX_KEY] });
      // ✅ FIX: parent must also refetch to show the new tax invoice
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useDeleteProforma = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.deleteProforma(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFORMA_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

// ═══════════════════════════════════════════════════════
// TAX INVOICE HOOKS
// ═══════════════════════════════════════════════════════

export const useTaxInvoicesByPostSales = (postSalesId) => {
  return useQuery({
    queryKey: [TAX_KEY, postSalesId],
    queryFn: () =>
      invoiceApi
        .getTaxInvoicesByPostSales(postSalesId)
        .then((res) => res.data.data),
    enabled: !!postSalesId,
  });
};

export const useTaxInvoiceById = (id) => {
  return useQuery({
    queryKey: [TAX_KEY, "single", id],
    queryFn: () =>
      invoiceApi.getTaxInvoiceById(id).then((res) => res.data.data),
    enabled: !!id,
  });
};

export const useCreateTaxInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postSalesId, data }) =>
      invoiceApi.createTaxInvoice(postSalesId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TAX_KEY, variables.postSalesId] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useMarkTaxInvoiceSent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.markTaxInvoiceSent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAX_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useMarkTaxInvoicePaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.markTaxInvoicePaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAX_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useDeleteTaxInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceApi.deleteTaxInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAX_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};

export const useMakeInvoicePaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ invoiceNumber, paymentData }) =>
      invoiceApi.makeInvoicePaid(invoiceNumber, paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAX_KEY] });
      queryClient.invalidateQueries({ queryKey: [POST_SALES_KEY] });
    },
  });
};