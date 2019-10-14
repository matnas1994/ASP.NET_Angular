import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-list',
  templateUrl: './payment-details-list.component.html',
  styleUrls: ['./payment-details-list.component.css']
})
export class PaymentDetailsListComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail){
    this.service.formData = Object.assign({},pd);
  }

  onDelete(PMId){
    if(confirm('Are you sure to delete this record?'))
    this.service.deletePaymentDetail(PMId).subscribe(
      res => {
        this.toastr.warning('Deleted successfully','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }
}
