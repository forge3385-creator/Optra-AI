# Operations Copilot Terraform IaC Infrastructure Module (§29.6)

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "environment" {
  type    = string
  default = "production"
}

resource "aws_vpc" "copilot_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name        = "copilot-vpc-${var.environment}"
    Environment = var.environment
  }
}

output "vpc_id" {
  value = aws_vpc.copilot_vpc.id
}
