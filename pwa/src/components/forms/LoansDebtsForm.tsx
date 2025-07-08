import React, { useState } from 'react';

type LoanDebt = {
  source: string;
  purpose: string;
  yearTaken: number;
  totalAmount: number;
  interestRate: number;
  repaymentFrequency: string;
  monthlyRepayment: number;
  outstandingBalance: number;
  additionalRemarks: string;
};

type HouseholdData = {
  loansDebts?: LoanDebt[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type LoanDebtError = Partial<Record<keyof LoanDebt, string>>;

const defaultLoan: LoanDebt = {
  source: '',
  purpose: '',
  yearTaken: 0,
  totalAmount: 0,
  interestRate: 0,
  repaymentFrequency: '',
  monthlyRepayment: 0,
  outstandingBalance: 0,
  additionalRemarks: '',
};

const LoansDebtsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newLoan, setNewLoan] = useState<LoanDebt>(defaultLoan);
  const [errors, setErrors] = useState<LoanDebtError>({});
  const safeData = householdData || {};
  const loansDebts: LoanDebt[] = safeData.loansDebts || [];

  const validate = (field: keyof LoanDebt, value: any) => {
    let error = '';
    if (field === 'source' && !value) error = 'Source is required';
    if (field === 'purpose' && !value) error = 'Purpose is required';
    if (field === 'yearTaken' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid year';
    if (field === 'totalAmount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid total amount';
    if (field === 'interestRate' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid interest rate';
    if (field === 'repaymentFrequency' && !value) error = 'Repayment frequency is required';
    if (field === 'monthlyRepayment' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid monthly repayment amount';
    if (field === 'outstandingBalance' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid outstanding balance';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newLoan) as (keyof LoanDebt)[]).forEach((field) => {
      if (!validate(field, newLoan[field])) valid = false;
    });
    return valid;
  };

  const addLoan = () => {
    if (!validateAll()) return;
    onChange('loansDebts', [...loansDebts, newLoan]);
    setNewLoan(defaultLoan);
    setErrors({});
  };

  return (
    <div className="form-section">
      <h2>💳 Details of Existing Loans / Debts</h2>
      <div className="add-loan-form">
        <h3>Add Loan / Debt</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Source of Loan *</label>
            <input
              type="text"
              value={newLoan.source}
              onChange={(e) => {
                const value = e.target.value;
                setNewLoan(prev => ({ ...prev, source: value }));
                validate('source', value);
              }}
              onBlur={() => validate('source', newLoan.source)}
              placeholder="Enter source (e.g., Bank, SHG, etc.)"
            />
            {Boolean(errors.source) && <span className="error">{errors.source}</span>}
          </div>
          <div className="form-group">
            <label>Purpose of Loan *</label>
            <input
              type="text"
              value={newLoan.purpose}
              onChange={(e) => {
                const value = e.target.value;
                setNewLoan(prev => ({ ...prev, purpose: value }));
                validate('purpose', value);
              }}
              onBlur={() => validate('purpose', newLoan.purpose)}
              placeholder="Enter purpose (e.g., Housing, Education, etc.)"
            />
            {Boolean(errors.purpose) && <span className="error">{errors.purpose}</span>}
          </div>
          <div className="form-group">
            <label>Year Taken</label>
            <input
              type="number"
              value={newLoan.yearTaken}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewLoan(prev => ({ ...prev, yearTaken: value }));
                validate('yearTaken', value);
              }}
              onBlur={() => validate('yearTaken', newLoan.yearTaken)}
              placeholder="Enter year taken"
              min="0"
            />
            {Boolean(errors.yearTaken) && <span className="error">{errors.yearTaken}</span>}
          </div>
          <div className="form-group">
            <label>Total Loan Amount</label>
            <input
              type="number"
              value={newLoan.totalAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewLoan(prev => ({ ...prev, totalAmount: value }));
                validate('totalAmount', value);
              }}
              onBlur={() => validate('totalAmount', newLoan.totalAmount)}
              placeholder="Enter total loan amount"
              min="0"
            />
            {Boolean(errors.totalAmount) && <span className="error">{errors.totalAmount}</span>}
          </div>
          <div className="form-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              value={newLoan.interestRate}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewLoan(prev => ({ ...prev, interestRate: value }));
                validate('interestRate', value);
              }}
              onBlur={() => validate('interestRate', newLoan.interestRate)}
              placeholder="Enter interest rate"
              min="0"
            />
            {Boolean(errors.interestRate) && <span className="error">{errors.interestRate}</span>}
          </div>
          <div className="form-group">
            <label>Repayment Frequency</label>
            <select
              value={newLoan.repaymentFrequency}
              onChange={(e) => {
                const value = e.target.value;
                setNewLoan(prev => ({ ...prev, repaymentFrequency: value }));
                validate('repaymentFrequency', value);
              }}
              onBlur={() => validate('repaymentFrequency', newLoan.repaymentFrequency)}
            >
              <option value="">Select Frequency</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
            {Boolean(errors.repaymentFrequency) && <span className="error">{errors.repaymentFrequency}</span>}
          </div>
          <div className="form-group">
            <label>Monthly Repayment Amount</label>
            <input
              type="number"
              value={newLoan.monthlyRepayment}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewLoan(prev => ({ ...prev, monthlyRepayment: value }));
                validate('monthlyRepayment', value);
              }}
              onBlur={() => validate('monthlyRepayment', newLoan.monthlyRepayment)}
              placeholder="Enter monthly repayment amount"
              min="0"
            />
            {Boolean(errors.monthlyRepayment) && <span className="error">{errors.monthlyRepayment}</span>}
          </div>
          <div className="form-group">
            <label>Outstanding Balance (if any)</label>
            <input
              type="number"
              value={newLoan.outstandingBalance}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewLoan(prev => ({ ...prev, outstandingBalance: value }));
                validate('outstandingBalance', value);
              }}
              onBlur={() => validate('outstandingBalance', newLoan.outstandingBalance)}
              placeholder="Enter outstanding balance"
              min="0"
            />
            {Boolean(errors.outstandingBalance) && <span className="error">{errors.outstandingBalance}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Remarks</label>
            <textarea
              value={newLoan.additionalRemarks}
              onChange={(e) => {
                const value = e.target.value;
                setNewLoan(prev => ({ ...prev, additionalRemarks: value }));
                validate('additionalRemarks', value);
              }}
              placeholder="Any additional remarks (delays, loan ID, etc.)"
            />
            {Boolean(errors.additionalRemarks) && <span className="error">{errors.additionalRemarks}</span>}
          </div>
        </div>
        <button type="button" onClick={addLoan} className="add-btn">
          ➕ Add Loan / Debt
        </button>
      </div>
      {loansDebts.length > 0 && (
        <div className="loans-list">
          <h3>Added Loans / Debts ({loansDebts.length})</h3>
          <div className="loans-grid">
            {loansDebts.map((loan: LoanDebt, idx: number) => (
              <div key={idx} className="loan-card">
                <h4>{loan.source}</h4>
                <p><strong>Purpose:</strong> {loan.purpose}</p>
                <p><strong>Year:</strong> {loan.yearTaken}</p>
                <p><strong>Amount:</strong> {loan.totalAmount}</p>
                <p><strong>Interest:</strong> {loan.interestRate}%</p>
                <p><strong>Repayment:</strong> {loan.repaymentFrequency}</p>
                <p><strong>Outstanding:</strong> {loan.outstandingBalance}</p>
                <p><strong>Remarks:</strong> {loan.additionalRemarks}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansDebtsForm; 