import { useState } from 'react';
import { getStudentReport, getInstructorReport, getFinancialReport } from '../../api/reportApi';
import ReportFilter from '../../components/reports/ReportFilter';
import ExportPDFButton from '../../components/reports/ExportPDFButton';

function ReportsDashboardPage() {
  const [activeTab, setActiveTab] = useState('financial');
  const [studentData, setStudentData] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStudentReport = async () => {
    setLoading(true);
    try {
      const res = await getStudentReport();
      setStudentData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadInstructorReport = async () => {
    setLoading(true);
    try {
      const res = await getInstructorReport();
      setInstructorData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinancialFilter = async (startDate, endDate) => {
    setLoading(true);
    try {
      const res = await getFinancialReport(startDate, endDate);
      setFinancialData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'financial', label: 'Financial' },
    { key: 'students', label: 'Students' },
    { key: 'instructors', label: 'Instructors' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
          Admin panel
        </span>

        <h1 className="text-3xl font-bold text-text-primary mb-1">
          Reports <span className="text-gradient-brand">dashboard</span>
        </h1>
        <p className="text-text-secondary mb-8">Generate student, instructor, and financial reports.</p>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (tab.key === 'students' && !studentData) loadStudentReport();
                if (tab.key === 'instructors' && !instructorData) loadInstructorReport();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-surface/70 border border-white/10 text-text-secondary hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'financial' && (
          <>
            <ReportFilter onFilter={handleFinancialFilter} />

            {loading && <p className="text-text-secondary">Loading report...</p>}

            {financialData && !loading && (
              <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-primary">
                    Financial report: {financialData.startDate} to {financialData.endDate}
                  </h2>
                  <ExportPDFButton />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-text-secondary text-xs mb-1">Total revenue</p>
                    <p className="text-text-primary text-xl font-bold">LKR {financialData.totalRevenue}</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-text-secondary text-xs mb-1">Pending / overdue</p>
                    <p className="text-text-primary text-xl font-bold">LKR {financialData.totalPending}</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-text-secondary text-xs mb-1">Total payments</p>
                    <p className="text-text-primary text-xl font-bold">{financialData.totalPayments}</p>
                  </div>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-text-secondary">
                      <th className="py-2 font-medium">Invoice</th>
                      <th className="py-2 font-medium">Amount</th>
                      <th className="py-2 font-medium">Method</th>
                      <th className="py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.payments.map((p) => (
                      <tr key={p._id} className="border-b border-white/5 last:border-0">
                        <td className="py-2 text-text-primary">{p.invoiceRef}</td>
                        <td className="py-2 text-text-primary">LKR {p.amount}</td>
                        <td className="py-2 text-text-secondary">{p.method}</td>
                        <td className="py-2 text-text-secondary">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'students' && (
          <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Student report ({studentData?.totalStudents ?? 0} total)
              </h2>
              <ExportPDFButton />
            </div>

            {loading ? (
              <p className="text-text-secondary">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-text-secondary">
                    <th className="py-2 font-medium">Name</th>
                    <th className="py-2 font-medium">NIC</th>
                    <th className="py-2 font-medium">Phone</th>
                    <th className="py-2 font-medium">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData?.students?.map((s) => (
                    <tr key={s._id} className="border-b border-white/5 last:border-0">
                      <td className="py-2 text-text-primary">{s.userId?.name || 'N/A'}</td>
                      <td className="py-2 text-text-secondary">{s.nic}</td>
                      <td className="py-2 text-text-secondary">{s.phone}</td>
                      <td className="py-2 text-text-secondary">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'instructors' && (
          <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Instructor report ({instructorData?.totalInstructors ?? 0} total)
              </h2>
              <ExportPDFButton />
            </div>

            {loading ? (
              <p className="text-text-secondary">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-text-secondary">
                    <th className="py-2 font-medium">Phone</th>
                    <th className="py-2 font-medium">License</th>
                    <th className="py-2 font-medium">Experience</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorData?.instructors?.map((i) => (
                    <tr key={i._id} className="border-b border-white/5 last:border-0">
                      <td className="py-2 text-text-primary">{i.phone}</td>
                      <td className="py-2 text-text-secondary">{i.licenseNumber}</td>
                      <td className="py-2 text-text-secondary">{i.experience} yrs</td>
                      <td className="py-2 text-text-secondary">{i.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsDashboardPage;