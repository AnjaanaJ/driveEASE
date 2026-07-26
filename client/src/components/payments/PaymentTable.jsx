import PaymentStatusBadge from './PaymentStatusBadge';
import { downloadInvoice } from '../../api/paymentApi';

function PaymentTable({ payments }) {
  const handleDownload = async (id) => {
    try {
      await downloadInvoice(id);
    } catch (err) {
      console.error('Failed to download invoice', err);
    }
  };

  return (
    <div className="mt-8 bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-text-secondary">
            <th className="py-3 px-4 font-medium">Invoice</th>
            <th className="py-3 px-4 font-medium">Amount</th>
            <th className="py-3 px-4 font-medium">Method</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-text-secondary">
                No payments found.
              </td>
            </tr>
          )}
          {payments.map((p) => (
            <tr key={p._id} className="border-b border-white/5 last:border-0">
              <td className="py-3 px-4 text-text-primary">{p.invoiceRef}</td>
              <td className="py-3 px-4 text-text-primary">LKR {p.amount}</td>
              <td className="py-3 px-4 text-text-secondary">{p.method}</td>
              <td className="py-3 px-4">
                <PaymentStatusBadge status={p.status} />
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDownload(p._id)}
                  className="text-accent hover:opacity-80 text-sm underline underline-offset-2"
                >
                  Download invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;