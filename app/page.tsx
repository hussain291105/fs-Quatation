'use client';

import { useState } from 'react';
import styles from './Quotation.module.css';

interface Item {
  id: number;
  name: string;
  description: string;
  qty: number;
  rate: number;
}

const initialItems: Item[] = [
  { id: 1, name: 'Plain tissue pack of 100', description: 'Hospitality Tissue Pack - 100 Pulls', qty: 1, rate: 23 },
  { id: 2, name: 'Plain tissue pack of 50', description: 'Compact Hospitality Tissue Pack - 50 Pulls', qty: 1, rate: 14 },
  { id: 3, name: 'Sterio', description: 'One-time setup charge for printed tissue preparation', qty: 1, rate: 1500 },
  { id: 4, name: 'Ultra soft plain tisues pack of 100', description: 'Ultra Soft Guest Tissue Pack - 100 Pulls', qty: 1, rate: 28 },
  { id: 5, name: 'Ultra soft plain tissue pack of 50', description: 'Ultra Soft Compact Guest Tissue Pack - 50 Pulls', qty: 1, rate: 16 },
  { id: 6, name: 'Printed tissue soft pack of 100', description: 'Custom Printed Soft Tissue Pack - 100 Pulls', qty: 1, rate: 25 },
  { id: 7, name: 'Printed tissue Ultra soft pack of 100', description: 'Custom Printed Ultra Soft Tissue Pack - 100 Pulls', qty: 1, rate: 30 },
];

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Quotation() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [quotationDate, setQuotationDate] = useState('May 31, 2026');
  const [validTillDate, setValidTillDate] = useState('Jun 15, 2026');
  const [countryOfSupply, setCountryOfSupply] = useState('India');
  const [placeOfSupply, setPlaceOfSupply] = useState('Other Territory (97)');
  const [gstStructure, setGstStructure] = useState('GST Structure: CGST 9% + SGST 9% = 18%');

  const recalcRow = (id: number, field: 'qty' | 'rate', value: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteRow = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addRow = () => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    setItems([...items, { id: newId, name: 'New item name', description: 'Description / terminology', qty: 1, rate: 0 }]);
  };

  const calculateTotals = (item: Item) => {
    const amount = item.qty * item.rate;
    const cgst = amount * 0.09;
    const sgst = amount * 0.09;
    const total = amount + cgst + sgst;
    return { amount, cgst, sgst, total };
  };

  const grandTotal = items.reduce((sum, item) => {
    const { total } = calculateTotals(item);
    return sum + total;
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className={`${styles.toolbar} noPrint`}>
        <div className={styles.hint}>✏️ Click any text, date, or amount to edit it directly. Qty & Rate recalculate totals automatically.</div>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.secondary}`} onClick={addRow}>+ Add Item Row</button>
          <button className={styles.btn} onClick={handlePrint}>Print / Save as PDF</button>
        </div>
      </div>

      {/* PAGE 1 */}
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 contentEditable suppressContentEditableWarning className={styles.editable}>COMMERCIAL QUOTATION</h1>
            <p contentEditable suppressContentEditableWarning className={styles.editable}>Tissue Supply Quotation for Hatimi Retreats</p>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.headerRight}>
            <h2 contentEditable suppressContentEditableWarning className={styles.editable}>FS ENTERPRISES</h2>
            <p contentEditable suppressContentEditableWarning className={styles.editable}>Quality Tissues, Trusted Service</p>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.box}>
            <div className={styles.bar}>SUPPLIER DETAILS</div>
            <div className={`${styles.content} ${styles.editable}`} contentEditable suppressContentEditableWarning>
              <strong>FS Enterprises</strong><br /><br />
              FS Enterprises Regd office: Sr No. 5/1B, Wadachiwadi, near Undri Chowk, Pune, Maharashtra, PIN: 411060, India<br /><br />
              Email: Fsenterprises5253@gmail.com<br />
              Phone: +91 84465 04238
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.bar}>CUSTOMER DETAILS</div>
            <div className={`${styles.content} ${styles.editable}`} contentEditable suppressContentEditableWarning>
              <div className={styles.quoteFor}>QUOTATION FOR</div>
              Hatimi Retreats<br />
              India
            </div>
          </div>
        </div>

        <div className={styles.summaryBox}>
          <div className={styles.bar}>QUOTATION SUMMARY</div>
          <div className={styles.summaryGrid}>
            <div className={styles.item}>
              <div className={styles.label}>Quotation Date</div>
              <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{quotationDate}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>Valid Till Date</div>
              <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{validTillDate}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>Country Of Supply</div>
              <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{countryOfSupply}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>Place Of Supply</div>
              <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{placeOfSupply}</div>
            </div>
          </div>
          <div className={`${styles.gstPill} ${styles.editable}`} contentEditable suppressContentEditableWarning>{gstStructure}</div>
        </div>

        <table className={styles.items}>
          <thead>
            <tr>
              <th className={styles.center}>Sr. No.</th>
              <th>Original Item Name / Professional Terminology</th>
              <th className={styles.center}>Qty</th>
              <th className={styles.center}>Rate</th>
              <th className={styles.center}>Amount</th>
              <th className={styles.center}>CGST (9%)</th>
              <th className={styles.center}>SGST (9%)</th>
              <th className={styles.center}>Total</th>
              <th className={`${styles.center} ${styles.delTh} noPrint`}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const { amount, cgst, sgst, total } = calculateTotals(item);
              return (
                <tr key={item.id}>
                  <td className={styles.center}>{index + 1}.</td>
                  <td>
                    <span className={styles.editable} contentEditable suppressContentEditableWarning>{item.name}</span>
                    <span className={`${styles.itemSub} ${styles.editable}`} contentEditable suppressContentEditableWarning>{item.description}</span>
                  </td>
                  <td className={styles.center}>
                    <input
                      type="number"
                      className={styles.qtyInput}
                      value={item.qty}
                      min={0}
                      onChange={(e) => recalcRow(item.id, 'qty', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td className={styles.center}>
                    <input
                      type="number"
                      className={styles.rateInput}
                      value={item.rate}
                      min={0}
                      step="0.01"
                      onChange={(e) => recalcRow(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td className={styles.center}>{fmt(amount)}</td>
                  <td className={styles.center}>{fmt(cgst)}</td>
                  <td className={styles.center}>{fmt(sgst)}</td>
                  <td className={styles.center}>{fmt(total)}</td>
                  <td className={`${styles.delCell} noPrint`}>
                    <button className={`${styles.btn} ${styles.danger}`} onClick={() => deleteRow(item.id)}>✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className={styles.grandRow}>
              <td colSpan={7} style={{ textAlign: 'right' }}>Grand Total</td>
              <td className={styles.center}>{fmt(grandTotal)}</td>
              <td className="noPrint"></td>
            </tr>
          </tfoot>
        </table>

        <div className={styles.termsBox}>
          <div className={styles.bar}>TERMS AND CLARIFICATION</div>
          <ul className={styles.editable} contentEditable suppressContentEditableWarning>
            <li>Quotation validity: This quotation is valid till Jun 15, 2026.</li>
            <li>GST clarification: The quotation reflects CGST 9% and SGST 9%, totaling 18% GST on applicable line items.</li>
            <li>One-time setup charge: The line item "Sterio" is recorded as a one time setup charge in the source quotation.</li>
            <li>Commercial scope: Rates and totals are presented as per the quoted items, quantities, and tax values stated above.</li>
            <li>Pending commercial confirmation: Delivery terms, payment terms, minimum order quantity, billing cycle, and order schedule are not specified in the source quotation and should be mutually confirmed before final order placement.</li>
            <li>Document note: This is an electronically generated document; no signature is required.</li>
          </ul>
        </div>

        <div className={styles.footer}>
          <div className={styles.note}>This is an electronically generated document; no signature is required.</div>
          <div className={styles.pagePill}>Page 1 of 2</div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 contentEditable suppressContentEditableWarning className={styles.editable}>COMMERCIAL QUOTATION</h1>
            <p contentEditable suppressContentEditableWarning className={styles.editable}>Quotation Continuation, Commercial Terms &amp; Contact</p>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.headerRight}>
            <h2 contentEditable suppressContentEditableWarning className={styles.editable}>FS ENTERPRISES</h2>
            <p contentEditable suppressContentEditableWarning className={styles.editable}>Quality Tissues, Trusted Service</p>
          </div>
        </div>

        <div className={styles.infoStrip}>
          <div className={styles.cell}>
            <div className={styles.label}>Quotation Date</div>
            <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{quotationDate}</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.label}>Quotation For</div>
            <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>Hatimi Retreats</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.label}>Valid Till Date</div>
            <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>{validTillDate}</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.label}>Page</div>
            <div className={`${styles.value} ${styles.editable}`} contentEditable suppressContentEditableWarning>Page 2 of 2</div>
          </div>
        </div>

        <div className={`${styles.notesBox} ${styles.editable}`} contentEditable suppressContentEditableWarning>
          <div className={styles.bar}>COMMERCIAL NOTES</div>

          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Better Title Used</div>
            The document is presented as a Commercial Quotation for Tissue Supply, making it suitable for B2B presentation.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Professional Item Terminology Added</div>
            Original item names are retained, with professional hospitality-oriented terminology added for clearer presentation.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>GST Structure</div>
            GST Structure reflected in the quotation: CGST 9% + SGST 9% = 18%.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Quotation Valid Till Date</div>
            Jun 15, 2026.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Country Of Supply</div>
            India.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Place Of Supply</div>
            Other Territory (97).
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>One Time Setup Charge</div>
            The line item "Sterio" is noted as a one time setup charge.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Pending Confirmation Before Order</div>
            Delivery terms, payment terms, MOQ, billing cycle, and supply schedule should be confirmed before final order placement.
          </div>
          <div className={styles.noteRow}>
            <div className={styles.noteTitle}>Document Note</div>
            This is an electronically generated document; no signature is required.
          </div>
        </div>

        <div className={`${styles.contactStrip} ${styles.editable}`} contentEditable suppressContentEditableWarning>
          For any enquiry, reach out via email at <a href="mailto:Fsenterprises5253@gmail.com">Fsenterprises5253@gmail.com</a>, call on <a href="tel:+918446504238">+91 84465 04238</a>
        </div>

        <div className={`${styles.preparedNote} ${styles.editable}`} contentEditable suppressContentEditableWarning>
          Prepared as a professional presentation version using the information provided in the original FS Enterprises quotation. Original commercial values have not been altered.
        </div>

        <div className={styles.footer}>
          <div className={styles.note}>This is an electronically generated document; no signature is required.</div>
          <div className={styles.pagePill}>Page 2 of 2</div>
        </div>
      </div>
    </>
  );
}
