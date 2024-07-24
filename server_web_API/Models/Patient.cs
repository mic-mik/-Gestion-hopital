﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server_web_API.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
    }
}