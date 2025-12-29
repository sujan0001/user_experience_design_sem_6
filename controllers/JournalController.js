import JournalVoucher from "../models/JournalVoucher.js";

export const createJournalVoucher = async (req, res) => {
  const { projectId, voucherNo, date, narration, lines } = req.body;

  if (!lines || lines.length < 2) {
    return res.status(400).json({ message: "Minimum two entries required" });
  }

  let totalDebit = 0;
  let totalCredit = 0;

  lines.forEach(l => {
    if (l.type === "DEBIT") totalDebit += l.amount;
    if (l.type === "CREDIT") totalCredit += l.amount;
  });

  if (totalDebit !== totalCredit) {
    return res.status(400).json({
      message: "Debit and Credit totals must match"
    });
  }

  const voucher = await JournalVoucher.create({
    projectId,
    voucherNo,
    date,
    narration,
    lines
  });

  res.status(201).json(voucher);
};
