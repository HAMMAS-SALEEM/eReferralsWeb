import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Week 1', requests: 30 },
  { name: 'Week 2', requests: 45 },
  { name: 'Week 3', requests: 60 },
  { name: 'Week 4', requests: 85 }
]

const Subscription = () => {
  return (
    <div className='subscription-main'>
      <div className='subscription-container'>
        <div className='subscription-header'>
          <h2>Subscription Status</h2>
          <span className='status-badge'>Active</span>

          <div className='plan-details'>
            <div>
              <p>
                <strong>Renewal:</strong> July 28, 2025
              </p>
              <p>
                <strong>Subscribed until:</strong> August 15, 2025
              </p>
              <p>
                <strong>Current Plan:</strong> Pro Tier
              </p>
            </div>

            <div className='button-group'>
              <button className='btn-change'>Change Plan</button>
              <button className='btn-cancel'>Cancel Subscription</button>
            </div>
          </div>

          <div className='usage-section'>
            <p>
              Requests Used: <strong>120 / 500</strong>
            </p>
            <div className='progress-bar'>
              <div className='progress-fill' style={{ width: '24%' }}></div>
            </div>
            <p className='overage-text'>Overage: $12.50</p>
          </div>
        </div>
        <div className='monthly-usage'>
          <h3>Monthly Usage</h3>
          <div className='chart-container'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='requests' fill='#60A5FA' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='billing-history'>
          <h3>Billing History</h3>
          <table className='billing-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>July 1, 2025</td>
                <td>$29.99</td>
                <td className='status-paid'>Paid</td>
                <td>
                  <a href='#' className='download-link'>
                    Download
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Subscription
