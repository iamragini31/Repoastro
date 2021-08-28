﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DataAccessLayer;
using Pandit_ApplicationEntity;


namespace Pandit_ApplicationManager
{
    public class OrdersManager
    {

        public List<OrdersModel> BindService(string custid)
        {
            List<OrdersModel> list = new List<OrdersModel>();
            SqlParameter flag = new SqlParameter("@Flag", '1');
            SqlParameter p1 = new SqlParameter("@PanditID", custid);
            DataTable dt = clsDataAccess.ExecuteDataTable(CommandType.StoredProcedure, "Sp_PanditOrderHistory", flag, p1);
            try
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        OrdersModel model = new OrdersModel();
                        model.OrderID = dt.Rows[i]["OrderID"].ToString();
                        model.Custname = dt.Rows[i]["Name"].ToString();
                        model.ReceivedDate = dt.Rows[i]["Received_Date"].ToString();
                        model.Servicename = dt.Rows[i]["Service"].ToString();
                        model.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                        //model.Service_Time= dt.Rows[i][""].ToString();
                        //model.Status = dt.Rows[i]["Status"].ToString();
                        list.Add(model);
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return list;
        }


        public int updateservice(string custid, string orderid)
        {
            int res = 0;
            SqlParameter flag = new SqlParameter("@Flag", '2');
            SqlParameter p1 = new SqlParameter("@PanditID", custid);
            SqlParameter p2 = new SqlParameter("@Orderid", orderid);
            try
            {
                res = clsDataAccess.ExecuteNonQuery(CommandType.StoredProcedure, "Sp_PanditOrderHistory", flag, p1, p2);

            }
            catch (Exception ex)
            {

            }

            return res;
        }


        public int rejectservice(string Panditid, string orderid)
        {
            int res = 0;
            SqlParameter flag = new SqlParameter("@Flag", '3');
            SqlParameter p1 = new SqlParameter("@PanditID", Panditid);
            SqlParameter p2 = new SqlParameter("@Orderid", orderid);
            try
            {
                res = clsDataAccess.ExecuteNonQuery(CommandType.StoredProcedure, "Sp_PanditOrderHistory", flag, p1, p2);

            }
            catch (Exception ex)
            {

            }

            return res;
        }

    }
}
