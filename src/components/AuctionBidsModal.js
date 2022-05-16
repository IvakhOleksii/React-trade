import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BIDS_MODAL_ID } from "../redux/actions/app/appActions";
import useOutsideClick from "../hooks/useOutsideClick";
import APIConfig from "../helpers/api/config";
import formatCurrency from "../helpers/formatCurrency";
import formatDate from "../helpers/formatDate";
import Loader from "./loader";

function AuctionBidsModal() {
  const { auctionId } = useSelector((state) => state.app);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: BIDS_MODAL_ID, value: null });
  };

  useOutsideClick(ref, handleClose);

  useEffect(() => {
    if (auctionId) {
      setLoading(true);
      axios(APIConfig("get", `/bidhistory/${auctionId}`, null))
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [auctionId]);

  return auctionId ? (
    <div className="bids-modal-container">
      <div ref={ref} className="bids-modal-content">
        <div className="bids-modal-row">
          <span>Bid History</span>
        </div>
        {loading ? (
          <Loader style={{ maxHeight: 250 }} />
        ) : (
          <table className="bids-modal-table">
            <thead>
              <tr className="bids-modal-header">
                <th>Start Date</th>
                <th>Bid Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ bid_price, start_date }) => (
                <tr key={start_date} className="bids-modal-item">
                  <td>
                    {formatDate(start_date, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrency(bid_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="bids-modal-row">
          <button className="bids-modal-button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default AuctionBidsModal;
