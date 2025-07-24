import React, { useState } from 'react'
import {
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Stack,
  Typography,
  Chip,
  IconButton,
  Popover,
  Collapse,
  Box,
  Tooltip,
  Table,
  TableBody
} from '@mui/material'
import { Circle } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReferralDetailsCollapse from './ReferralDetailsCollapse'
import ActionButtons from './ActionButtons'

import dayjs from 'dayjs'

import pathologyIcon from './../../assets/icons/pathology-icon.svg'
import radiologyIcon from './../../assets/icons/radiology-icon.svg'
import ReferralService from '../../services/ReferralService'

const getReferralIcon = type => {
  switch (type) {
    case 'PATHOLOGY':
      return pathologyIcon
    case 'RADIOLOGY':
      return radiologyIcon
    default:
      return null
  }
}

const getStatusChip = status => {
  switch (status) {
    case 'DRAFT':
      return {
        label: 'Draft',
        color: 'info',
        circleStyles: {
          fill: 'red',
          filter: 'drop-shadow(0px 0px 10px red)'
        }
      }
    case 'SENT':
      return {
        label: 'Sent',
        color: 'primary',
        circleStyles: {
          fill: '#83BCFF',
          filter: 'drop-shadow(0px 0px 10px #83BCFF)'
        }
      }
    case 'BOOKED':
      return {
        label: 'Booked',
        color: 'warning',
        circleStyles: {
          fill: '#FFF383',
          filter: 'drop-shadow(0px 0px 10px #FFF383)'
        }
      }
    case 'COMPLETED':
      return {
        label: 'Completed',
        color: 'success',
        circleStyles: {
          fill: '#42FF00',
          filter: 'drop-shadow(0px 0px 10px #42FF00)'
        }
      }
    case 'RESULTS':
      return {
        label: 'Results',
        color: 'success',
        circleStyles: {
          fill: '#ff03c8ff',
          filter: 'drop-shadow(0px 0px 10px #ff03c8ff)'
        }
      }
    default:
      return {
        label: status,
        color: 'default',
        circleStyles: {
          fill: 'rgba(0, 0, 0, 0.5)'
        }
      }
  }
}

const cellTextStyle = {
  fontSize: '16px',
  color: '#000',
  fontWeight: 400,
  lineHeight: '24px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'flex-start'
}

const ReferralRow = ({
  referral,
  isRowSelected,
  toggleRowSelection,
  toggleRowExpansion,
  isExpanded
}) => {
  console.log(referral)
  const [anchorEl, setAnchorEl] = useState(null)

  const referralIcon = getReferralIcon(referral.type)

  const doctorName = referral.from_doctor_data
    ? `${referral.from_doctor_data.first_name} ${referral.from_doctor_data.last_name}`
    : 'N/A'

  const {
    label: statusLabel,
    color: statusColor,
    circleStyles
  } = getStatusChip(referral.status)

  const handlePopoverOpen = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = event => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const isPopoverOpen = Boolean(anchorEl)

  const getReferralReportPdf = async (id) => {
  try {
    const response = await ReferralService.downloadReferralReportPdf(id);

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000 * 60); // 1 min
  } catch (error) {
    return error;
  }
};

  return (
    <>
      <TableRow
        role='checkbox'
        aria-checked={isRowSelected}
        selected={isRowSelected}
        onClick={() => toggleRowExpansion(referral.id)}
        style={{ cursor: 'pointer' }}
      >
        <TableCell
          colSpan={9}
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
        >
          <Box
            sx={{
              background: referral.is_archived ? 'rgba(0, 0, 0, 0.30)' : '#fff',
              borderRadius: '5px',
              marginBottom: '5px',
              boxShadow: '0px 0px 39px 0px rgba(0, 0, 0, 0.10)',
              ...(isExpanded
                ? {}
                : {
                    maxHeight: '68px',
                    overflow: 'hidden'
                  })
            }}
          >
            <Table
              sx={{
                width: '100%',
                borderCollapse: 'separate',
                tableLayout: 'fixed'
              }}
            >
              <TableBody>
                <TableRow
                  sx={{
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1%'
                  }}
                >
                  <TableCell
                    padding='checkbox'
                    sx={{ width: '50px', borderBottom: 'none' }}
                  >
                    <Checkbox
                      checked={isRowSelected}
                      onChange={() => toggleRowSelection(referral.id)}
                      onClick={event => event.stopPropagation()}
                      inputProps={{
                        'aria-labelledby': `referral-checkbox-${referral.id}`
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Stack
                      direction={'row'}
                      alignItems='center'
                      sx={{ overflow: 'hidden' }}
                    >
                      {referralIcon && (
                        <Avatar
                          src={referralIcon}
                          alt={referral.type}
                          sx={{
                            width: 24,
                            height: 24,
                            marginRight: 1,
                            display: 'inline-block'
                          }}
                        />
                      )}
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontSize: '16px',
                          color: '#000',
                          fontWeight: 400,
                          lineHeight: '24px',
                          textAlign: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        {referral.type.toLowerCase()}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Typography variant='subtitle1' sx={cellTextStyle}>
                      {referral.created_date
                        ? dayjs(referral.created_date).format('DD/MM/YYYY')
                        : 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Typography variant='subtitle1' sx={cellTextStyle}>
                      {doctorName}
                    </Typography>
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      maxWidth: '150px'
                    }}
                  >
                    <Typography variant='subtitle1' sx={cellTextStyle}>
                      {`${referral.patient_data.first_name} ${referral.patient_data.last_name}`}
                    </Typography>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Typography variant='subtitle1' sx={cellTextStyle}>
                      {referral.patient_data.birth_date
                        ? dayjs(referral.patient_data.birth_date).isValid()
                          ? dayjs(referral.patient_data.birth_date).format(
                              'DD/MM/YYYY'
                            )
                          : 'Invalid date'
                        : 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Typography variant='subtitle1' sx={cellTextStyle}>
                      {referral.to_service_data?.organisation?.name || 'N/A'}
                    </Typography>
                  </TableCell>

                  {/* Referral Status */}
                  <TableCell
                    sx={{
                      width: '10%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Tooltip
                      title={
                        referral.created_date
                          ? dayjs(referral.created_date).format('DD/MM/YYYY')
                          : 'N/A'
                      }
                      arrow
                    >
                      <Chip
                        label={statusLabel}
                        color={statusColor}
                        size='small'
                        icon={
                          <Circle
                            sx={{
                              fontSize: '8px !important',
                              fill: circleStyles.fill,
                              filter: circleStyles.filter,
                              marginRight: '5px !important',
                              marginLeft: '-5px !important'
                            }}
                          />
                        }
                        sx={{
                          borderRadius: '20px',
                          background: 'rgba(0, 0, 0, 0.70)',
                          fontWeight: 'bold',
                          color: '#FFF',
                          fontSize: '14px',
                          padding: '5px 10px',
                          maxHeight: '24px',
                          // overflow: "hidden",
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          border: '1px solid red'
                        }}
                      />
                    </Tooltip>
                    <button
                      onClick={() => getReferralReportPdf(referral.id)}
                      className='result-download-btn'
                    >
                      Download
                    </button>
                  </TableCell>

                  {/* MoreVertIcon for Action Buttons */}
                  <TableCell
                    align='center'
                    sx={{
                      width: '5%',
                      borderBottom: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <IconButton
                      onClick={handlePopoverOpen}
                      sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: '100%',
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 30 }} />
                    </IconButton>

                    <Popover
                      open={isPopoverOpen}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      PaperProps={{
                        sx: {
                          backgroundColor: '#333',
                          borderRadius: '16px',
                          padding: '10px 20px'
                        }
                      }}
                    >
                      <ActionButtons
                        referral={referral}
                        onClose={handlePopoverClose}
                      />
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Collapse
            in={isExpanded}
            timeout={{ enter: 500, exit: 500 }}
            unmountOnExit
            sx={{ width: '100%' }}
          >
            <Box sx={{ mb: 2, ml: 2, mr: 2 }}>
              <ReferralDetailsCollapse
                referral={referral}
                isExpanded={isExpanded}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Conditionally Render the Expanded Referral Details */}
      {/* {isExpanded && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <ReferralDetailsCollapse
                  referral={referral}
                  isExpanded={isExpanded}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )} */}
    </>
  )
}

export default ReferralRow
