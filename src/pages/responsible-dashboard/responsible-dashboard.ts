import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExecuteActionPlanPage} from '../execute-action-plan/execute-action-plan';
import { EvaluationExecutionDto } from '../../dto/evaluation-execution-dto';
import { EvaluateServiceProvider } from '../../providers/evaluate-service';
import { Evaluate } from '../../model/evaluate';
import { EvaluateResponsibleResumePage } from '../evaluate-responsible-resume/evaluate-responsible-resume';

@IonicPage()
@Component({
  selector: 'page-responsible-dashboard',
  templateUrl: 'responsible-dashboard.html',
})
export class ResponsibleDashboardPage {

  evaluates: EvaluationExecutionDto[];
  pending: EvaluationExecutionDto[] = new Array<EvaluationExecutionDto>();
  delayed: EvaluationExecutionDto[] = new Array<EvaluationExecutionDto>();

  showEvaluatesDelayed = false;
  showEvaluatesPending = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public evaluateService: EvaluateServiceProvider) { }

  ionViewDidLoad() {
    this.init();
  }

  goToEvaluateResume(evaluation: EvaluationExecutionDto){
    this.navCtrl.push(EvaluateResponsibleResumePage,{evaluation:evaluation});
  }

  init(){
    this.evaluateService.searchResponsible().subscribe(x => {
      this.evaluates = x;
      this.evaluates.forEach(evaluate =>{
        if(new Date(evaluate.audit_due_date) >= new Date()){
          this.pending.push(evaluate)
        } else {
          this.delayed.push(evaluate);
        }
      });
    });
  }

  changeShowEvaluateDelayed(){
    if(!this.showEvaluatesDelayed){
      this.showEvaluatesDelayed = true;
      this.showEvaluatesPending = false;
    } else {
      this.showEvaluatesDelayed = false;      
    }
  }

  changeShowEvaluatePending(){
    if(!this.showEvaluatesPending){
      this.showEvaluatesPending = true;
      this.showEvaluatesDelayed = false;
    } else {
      this.showEvaluatesPending = false;      
    }
  }

}
