import { Component } from '@angular/core';

@Component({
  selector: 'app-quote-basic-info-continue',
  standalone: false,

  templateUrl: './quote-basic-info-continue.component.html',
  styleUrls: ['./quote-basic-info-continue.component.scss']
})
export class QuoteBasicInfoContinueComponent {
productId: any;
quoteRefNo: any;
CommonApiUrl: any;
sharedService: any;
vehicleData: any;
premumSection: boolean;
finalizeYN: any;
emipolicytype: any;
endorsementSection: boolean;
endorsementId: any;
endorseEffectiveDate: any;
enableFieldsList: any;
coverModificationYN: string;
adminRemarks: any;
currencyCode: any;
vehicleDetailsList: any[];
  yearlySection: boolean;
  nineMonthSection: boolean;
  sixMonthSection: boolean;
  threeMonthSection: boolean;
  fiveMonthSection: boolean;
  eightMonthSection: boolean;
  emiYN: any='N';
  Emilist1: any[]=[];
  emiSection: boolean;
  endorseAddOnCovers: boolean=false;
  endorseCovers: boolean=false;
  endorseSIModification: boolean=false;
  quoteNo: any=null;
  adminSection: boolean=false;
  isMannualReferal: any=null;
  selectedRowData: any=null;
  statusValue:any=null;
  selectedVehicleList: any[]=[];
  coverSection: boolean;
  insuranceId: any;
  totalPremium: any;
  localPremiumCost: number;
  emiPeriod: any;
  selectedCoverList: any[]=[];
  rejectedReason: any;
  enableAddVehicle: any;
//   searchMake: string = '';
//   insuredAmount: string = '';

//   vehicleMakes = ['Make 1', 'Make 2', 'Make 3', 'Make 4', 'Make 5', 'Make 6','Make 7', 'Make 8', 'Make 9'];
//   insuranceTypes = ['Type 1', 'Type 2', 'Type 3'];
// premumSection: any;
constructor(){
  this.productId ='5'
  this.onViewCalc();
}
onViewCalc(){
          let obj = JSON.parse(sessionStorage.getItem('coverListObj'));
          if(obj){
            this.vehicleData = obj;
            if(this.vehicleData.length!=0){
              this.premumSection=true;
              let finalizeyn = this.vehicleData[0]?.FinalizeYn;
              if(finalizeyn!=null){this.finalizeYN = finalizeyn;sessionStorage.setItem('FinalizeYN',finalizeyn);}
              else{this.finalizeYN='N';sessionStorage.removeItem('FinalizeYN')};
            }
            // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
            //     console.log('KKKKKKKKKKKK',this.emipolicytype);
           
            // let refRemarks = this.vehicleData[0].ReferalRemarks;
            // if(refRemarks){
            //   this.referralRemarks = refRemarks.split('~');
            // }
            if(this.productId=='5' || this.productId=='29'){
              let j=0;let datass:any=[]
              if(this.vehicleData.length>1){
                if(this.vehicleData[0]?.RiskDetails?.InsuranceClass == this.vehicleData[1]?.RiskDetails?.InsuranceClass){
                  this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                }
                else{
                  this.emipolicytype='99999';
                }
              }
              else{
               this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              }
              // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              // console.log('KKKKKKKKKKKK',this.emipolicytype);
             }
             else{
              this.emipolicytype='99999';
             }
  
            let vehicleList:any[]=[];
            if(this.vehicleData.length!=0){
              let referralList = this.vehicleData.filter(ele=>(ele.UWReferral!=null && ele.UWReferral.length!=0) || ele.MasterReferral.length!=0);
              if(this.vehicleData[0].EndtTypeMaster!=null){
                let quoteDetails = this.vehicleData[0].EndtTypeMaster
                if(!JSON.parse(sessionStorage.getItem('endorseTypeId'))){
                  let obj = {
                    "EndtTypeId": Number(quoteDetails?.Endttypeid),
                    "FieldsAllowed":quoteDetails.Endtdependantfields.split(','),
                    "EffectiveDate":quoteDetails.Endorsementeffdate,
                    "Remarks":quoteDetails.Remarks,
                    "Category": quoteDetails.Endttypecategory,
                    "EndtName": quoteDetails.Endttype,
                    "PolicyNo": quoteDetails?.PolicyNo
                  }
                  sessionStorage.setItem('endorsePolicyNo',this.vehicleData[0].OriginalPolicyNo);
                  //sessionStorage.setItem('endorsePolicyNo',)
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
                  this.endorsementSection = true;
                  let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
                  if(endorseObj){
                    this.endorsementId = endorseObj.EndtTypeId;
                    this.endorseEffectiveDate = endorseObj?.EffectiveDate;
                    this.enableFieldsList = endorseObj.FieldsAllowed;
                    let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection'  || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
                    if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
                    else this.coverModificationYN = 'N';
                    if(this.endorsementId!=42){
                      
                    }
                    else{
                        
                    }
                  }
                }
              }
              if(this.vehicleData[0].HavePromoCode){
                
              }
              else{
                
              }
              let admRemarks = this.vehicleData[0].AdminRemarks;
              if(admRemarks){
                this.adminRemarks = admRemarks.split('~');
  
              }
              this.currencyCode= this.vehicleData[0]?.Currency;
              let i=0;
              for(let veh of this.vehicleData){
                veh['ReferralList'] = [];
                if(veh.MasterReferral.length!=0){
                  for(let master of veh.MasterReferral){
                    veh['ReferralList'].push(master.ReferralDesc)
                  }
                }
                if(veh.UWReferral.length!=0){
                  for(let master of veh.UWReferral){
                    veh['ReferralList'].push(master.QuestionDesc)
                  }
                }
                if(veh.EndorsementYn=='Y'){
                  if(this.endorsementSection==false){
                    
                  }
                }
                // if(veh.ReferalRemarks){
                //   veh['ReferralList']= veh.ReferalRemarks.split('~');
                // }
                if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId;
                  veh['Active'] = true;
                  let coverList = veh.CoverList;
                  let baseCovers =[],otherCovers=[];
                  baseCovers = coverList.filter(ele=>ele.CoverageType=='B');
                  otherCovers= coverList.filter(ele=>ele.CoverageType!='B');
                  veh.CoverList = baseCovers.concat(otherCovers)
                  if(i==0){
                    veh['Collapse'] = true;
                    //this.remarks = veh.AdminRemarks;
                    vehicleList.push(veh);
                  }
                  else{
                    veh['Collapse'] = false;
                    vehicleList.push(veh);
                  }
                  i+=1;
                  if(i==this.vehicleData.length){
                    console.log("Final Vehicle List",vehicleList)
                    //sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                    if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
                      this.vehicleData = vehicleList;
                      this.filterVehicleList();
                    }
                    else{
                      this.vehicleDetailsList = vehicleList;
                      this.checkSelectedCovers();
                    }
                  }
              }
            }
          }
      
}
checkDefaultCover(vehicle,coverList){
  if(coverList){
    return coverList.some(cover=>((cover.isSelected=='D' && cover.CoverageType!='A')) ||  this.checkCoverSelection(vehicle,cover))
  }
  else return false;
}
checkAddonCover(vehicle,coverList){
  if(coverList){
    return coverList.some(cover=>((cover.isSelected!='D' && cover.CoverageType!='A')) && !this.checkCoverSelection(vehicle,cover))
  }else return false;
}
checkCoverSelection(vehicleData,coverData){
  if(this.finalizeYN=='Y') return true;
  else if(this.endorsementSection && !this.adminSection && this.statusValue!='RA'){
    if(this.endorseCovers){
      if(!this.adminSection && coverData.ModifiedYN =='N') return false;
      else if(!this.adminSection) return true;
      else return false;
    }
    else if(this.endorseSIModification){
      // console.log("Admin Section",this.adminSection,coverData.ModifiedYN)
      if(!this.adminSection && coverData.ModifiedYN =='Y') return false;
      else if(!this.adminSection) return true;
      else return false;
    }
    else if(vehicleData.EndorsementYN=='Y') return false;
    else if(this.endorseAddOnCovers && coverData.ModifiedYN =='Y'){
        return false;
    }
    else if(this.enableAddVehicle){
      if(vehicleData.EndorsementYn=='Y')return false;
      else return true;
    }
    else if(this.endorseAddOnCovers && this.adminSection )return false;
    else return true;  
  }
  else if(!this.adminSection && this.statusValue=='RA' && (((coverData.isSelected=='D' || coverData.isSelected=='O' || coverData.isSelected=='Y' || coverData?.UserOpt=='Y') && !this.endorsementSection) || 
  (this.endorsementSection && (coverData.UserOpt=='Y' || coverData.isSelected=='D' || coverData.isSelected=='O')))) return true;
  else return false;
}
getCoverNameDesc(rowData){
  return rowData.CoverName;
}
filterVehicleList(){
  let vehicleList = [];
  console.log("Vehiclessss on Filter",this.vehicleDetailsList,this.vehicleData)
    if(this.vehicleData.length!=0){
        let i=0;
        this.vehicleDetailsList = [];
        for(let vehicle of this.vehicleData){
          if(i==0){
              vehicleList.push(vehicle);
          }
          else{
            let entry = vehicleList.find(ele=>ele.VehicleId==vehicle.VehicleId);
            if(entry){

              if(entry.SectionId==vehicle.SectionId){
                entry.CoverList = entry.CoverList.concat(vehicle.CoverList);
              }
              else{
                vehicleList.push(vehicle);
              }
            }
            else{
              vehicleList.push(vehicle);
            }
          }

          i+=1;
          if(i==this.vehicleData.length){
            this.vehicleDetailsList = vehicleList;
            console.log("Filtered Vehicle List",this.vehicleDetailsList)
            this.checkSelectedCovers();
          }
        }
    }
}
checkSelectedCovers(){
  console.log('VVVVVVVVV',this.vehicleDetailsList);
  if(this.vehicleDetailsList.length!=0){
    if(this.vehicleDetailsList[0].CoverList.length!=0){
      this.currencyCode== this.vehicleDetailsList[0].CoverList[0].Currency;
    }
    let j=0;
    for(let veh of this.vehicleDetailsList){
      veh['totalPremium'] = 0;
      let i=0;
      let coverList:any[]=veh.CoverList;
      for(let cover of coverList){
        cover['ExcessDesc'] = 'None';
        let fieldList = [];
        if(cover.Endorsements!=null && veh.Status!='D'){
          
          cover['DifferenceYN']= 'Y';
          if(veh?.EndtTypeMaster?.Endtdependantfields){
            fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
          }
        }
        if(cover.Endorsements!=null && !this.endorsementSection){
          this.endorsementSection = true;
          
          let obj = {
            "EndtTypeId":cover.Endorsements[0].EndorsementId,
            "FieldsAllowed": fieldList,
            "EffectiveDate":cover.EffectiveDate,
            "Remarks":null,
            "Category": veh?.EndtTypeMaster?.Endttypecategory,
            "EndtName": cover.Endorsements[0].EndorsementDesc,
            "PolicyNo": null
          }
          this.endorsementId = cover.Endorsements[0].EndorsementId;
          this.endorseEffectiveDate = cover.EffectiveDate;
          this.enableFieldsList = fieldList;
          let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection' || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
          if(this.coverModificationYN=='N'){
            if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
            else this.coverModificationYN = 'N';
          }
          sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
        }
        if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
        (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='D' || cover.isSelected=='O')) ){
          // if(this.endorsementId == 846 && veh.Status=='D'){
          //   cover['selected']= false;
          //   this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
          // }
          // else{
            this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
          //}
          
        }
        else{
          console.log("Not Selected 1",cover);
          cover['selected']= false;
        }
        if(cover.SubCovers!=null){
          let k=0;
          for(let sub of cover.SubCovers){
            if(sub.isSelected=='D' || sub.isSelected=='O' || sub.isSelected=='Y' || sub?.UserOpt=='Y'){
                  this.onChangeSubCover(sub,cover,veh,true,null);
            }
            k+=1;
            if(k==cover.SubCovers){
              i+=1;
              if(i==coverList.length){
                let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
                let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
                veh.CoverList = defaultList.concat(otherList);
                if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
              }
            }
          }
        }
        else{
          i+=1;
          if(i==coverList.length){
            let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
            let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
            veh.CoverList = defaultList.concat(otherList);
            if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
            
          }
        }
        
      }
      j+=1;
      if(j==this.vehicleDetailsList.length){
        if(this.endorsementId==846){
            let vehicles = this.vehicleDetailsList.filter(ele=>ele.Status=='D');
            console.log("Entered Veh 1",vehicles)
            if(vehicles.length!=0){
              let n=0;
                for(let veh of vehicles){
                  let SectionEntry:any[]=[];
                  SectionEntry = this.vehicleDetailsList.filter(ele=>ele.Status=='E' && ele.SectionId==veh.SectionId);
                  let coverList:any[]=veh.CoverList;
                  let j = 0;
                  for(let cover of coverList){
                    if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
                      (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='Y')) ){
                        cover['selected']= false;
                        this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
                        cover['DifferenceYN'] = 'N';
                        if(SectionEntry.length!=0){
                          let coverList = SectionEntry[0]?.CoverList;
                          let covers = coverList.filter(ele=>ele.CoverId==cover.CoverId);
                          
                          if(!(covers[0].UserOpt=='Y' || covers[0].isSelected=='D' || covers[0].isSelected=='O')){
                            console.log("Opted Sections",SectionEntry[0],covers)
                            covers[0]['selected']= true;
                            this.onSelectCover(covers[0],true,SectionEntry[0].Vehicleid,SectionEntry[0],'coverList','change');
                             covers[0]['DifferenceYN'] = 'Y';
                          }
                        }
                        
                      }
                    
                    j+=1;
                    if(j==coverList.length) n+=1;
                  }
                  
                  if(n==vehicles.length){
                    if(this.quoteNo!="null" && this.quoteNo!=null){
                    }
                     if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                      this.getEditQuoteDetails();
                    }
                    else{
                      
                    }
                  }
                }
            }
            else{
              if(this.quoteNo!="null" && this.quoteNo!=null){
                //this.getEditQuoteDetails();
              }
               if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                //this.updateComponent.quoteNo = this.quoteNo;
                this.getEditQuoteDetails();
              }
              else{
                
              }
            }
        }
        else{
          if(this.quoteNo!="null" && this.quoteNo!=null){
            //this.getEditQuoteDetails();
          }
           if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
            //this.updateComponent.quoteNo = this.quoteNo;
            this.getEditQuoteDetails();
          }
          else{
            
          }
        }
        
        //this.onGetCoverListById();
      }
    }


  }
}
getEditQuoteDetails(){
  let i=0;
  for(let veh of this.vehicleDetailsList){
    if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId
      if(i ==0 ){ //this.remarks = veh.AdminRemarks;
         this.rejectedReason = veh.RejectReason}
      let covers = veh.CoverList;
      let j=0;
      for(let cover of covers){
        
          let entry = this.vehicleDetailsList.find(ele=>String(ele.Vehicleid)==String(veh.VehicleId))
          if(entry){
            let coverList = entry.CoverList;
            if(cover.UserOpt=='Y' ){
              let coverEntry = coverList.find(ele=>ele.CoverId == cover.CoverId)
              if(coverEntry){
                if(this.endorsementId == 846 && veh.Status=='D'){
                  cover['selected']= false;
                 // this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                }
                else{
                  cover['selected']= true;
                  this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                }
                console.log("Selected 2",cover);
              }
            }
           
          }
          j+=1;
          if(j==covers.length) i+=1;
      }

      if(i==this.vehicleDetailsList.length){
        if(this.vehicleDetailsList.some(ele=>ele.ManualReferalYn=='Y') && !this.adminSection && this.statusValue){
          this.isMannualReferal = "N";
        }
        this.selectedRowData = this.vehicleDetailsList[0];
        this.onSelectSection();
        //this.coverSection = true;
        // if(((this.uwReferralSection && !this.adminSection && (this.statusValue=='RP' || this.statusValue=='' || this.statusValue==null || this.statusValue==undefined))  || (!this.adminSection && this.statusValue=='RP' && this.vehicleDetailsList.some(ele=>ele.Status=='RP')))){
        //   this.columnHeader = [
        //     {
        //       key: 'selected',
        //       display: 'Select',
        //       config: {
        //         isChecked:true
        //       },
        //     },
        //     { key: 'CoverName', display: 'Cover Name' },
        //     { key: 'SumInsured', display: 'Sum Insured' }
    
        //   ]
        // }
        // else{
    
         
        //}
        // if(!this.endorsementSection){
        //   this.EmiInstallment();
        // }
        
        console.log("Final Vehicle Listaaaa",this.vehicleDetailsList,this.selectedCoverList)
      }
  }

  }
  canbeChecked(rowData){
    if(rowData?.selected!=undefined){
      return rowData.selected;
    }
    return false;
  }
  onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){
    if(event==null){
      event = !this.canbeChecked(rowData);
    }
    //if(type=='coverList' && (rowData.SubCovers==null || (rowData.SubCovers!=null && rowData.SubCoverId!=null))){
      let vehicle:any;
        if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
          vehicle = this.vehicleDetailsList.find(ele=>(ele.LocationId==rowData.LocationId && ele.SectionId==rowData.SectionId));
          if(vehicle==undefined) vehicle = vehicleData
         
        }
        else{
          vehicle = this.vehicleDetailsList.find(ele=>ele.Vehicleid==vehicleId && ele.SectionId==rowData.SectionId && ele.LocationId==rowData.LocationId);
        }
        let coverList = vehicle?.CoverList;
        if(event){
          rowData.selected= true;
          if(rowData.DifferenceYN==undefined && this.coverModificationYN=='Y'){
            if(vehicle.Status=='D') rowData.DifferenceYN = 'N';
            else rowData.DifferenceYN = 'Y'
          }
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>(ele.Id==vehicleId && (this.productId=='5' || this.productId=='46')) || (ele.LocationId==rowData.LocationId && (this.productId!='5' && this.productId!='46')) );
            if(entry.length==0){
              let id=null;
              if(rowData.RiskDetails?.RiskId) id= rowData.RiskDetails?.RiskId; else id=vehicleId
              if(rowData.SubCovers==null){
                console.log("Error Vehicle",vehicle)
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N"
                    }
                  ],
                  "LocationId": rowData.LocationId,
                  "Id": id,
                  "SectionId": rowData.SectionId
                }
                this.selectedCoverList.push(element);
              }
              if(directType=='change' && this.endorsementSection){
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN=='Y'){
                    if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  //rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax = 0;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
              }
              else if(vehicle?.totalPremium){
                console.log('Endorsemet section Values 2')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                console.log('Endorsemet section Values3')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                 
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0;}
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    
                  }
                }
                else{
                 
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
                
              }
                console.log("Total Premium",rowData,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
              console.log('Endorsemet section Values4');
             let sectionEntry = entry.find(ele=>ele.SectionId == rowData.SectionId);
            
             if(sectionEntry == undefined){
              if(rowData.SubCovers==null){
                let id=null;
                if(rowData.RiskDetails?.RiskId) id= rowData.RiskDetails?.RiskId; else id=vehicleId
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "LocationId": rowData.LocationId,
                  "Id": id,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'Y';
                }
                console.log("Selected Cover Lists",this.selectedCoverList)
              }
              
              if(directType=='change' && this.endorsementSection){
                
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                
                if(this.coverModificationYN=='Y' && this.endorsementSection && vehicle?.totalPremium && rowData.Endorsements!=null){
                  if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else if(vehicle?.totalPremium){
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
  
  
                  }
                  else{
                    
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                }
                
              }
              else if(vehicle?.totalPremium){
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }


                }
                else{
                  
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                }
                else{
                    console.log("Row Data",rowData,vehicle);
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
              }
                this.getTotalVehiclesCost();
             }
             else{
                let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==rowData.CoverId);
              if(findCover.length==0) {
                if(rowData.SubCovers==null){
                  let element = {
                        "CoverId": rowData.CoverId,
                         "SubCoverId": null,
                         "SubCoverYn": "N",
                  }
                  sectionEntry.Covers.push(element)
                }
                if(directType=='change' && this.endorsementSection){
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      else{
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    console.log('JJJJJJJJJ',vehicle?.totalLcPremium,vehicle?.totalPremium);
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0; }
                    console.log('If cover changes10',rowData,rowData.PremiumIncludedTax,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                      console.log('Total Premiums 111111111',vehicle?.totalPremium,rowData.PremiumIncludedTax);
                      vehicle['totalPremium'] =  vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                      console.log('end', vehicle);
                  }
                }
                else if(vehicle?.totalPremium){
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                    console.log('If cover changes0',rowData.PremiumIncludedTax,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      
                      if(!vehicle?.totalLcPremium){ vehicle['totalLcPremium'] = 0;}
                      if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                }
                this.getTotalVehiclesCost();
              }
             }
            }
          }
          else{
            if(rowData.SubCovers==null){
              let id=null;
              if(rowData.VehicleId) id= rowData.VehicleId; else id=vehicleId
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N"
                  }
                ],
                "LocationId": rowData.LocationId,
                "Id": id,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
            }
            if(directType=='change' && this.endorsementSection){
              if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                rowData['ModifiedYN'] = 'Y';
              }
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                if(this.coverModificationYN=='Y'){
                  if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
              }
              
            }
            else if(vehicle?.totalPremium){
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                if(this.coverModificationYN!='Y' || this.endorseSIModification){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
              }
              else{
                
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
              }
            
            }
            else{
              if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                if(this.coverModificationYN!='Y' || this.endorseSIModification){
                  vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                }
              }
              else{
                vehicle['totalLcPremium'] =  rowData.PremiumIncludedTax;
                vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
              }
            }
          this.getTotalVehiclesCost();
          }
        }
        else{
          rowData['selected']= false;
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
          if(entry){
            let sectionEntry = entry.find(ele=>ele.SectionId==rowData.SectionId);
            if(sectionEntry!=undefined){
              let covers:any[] = sectionEntry.Covers;
              let CoverIndex = covers.findIndex(ele=>ele.CoverId==rowData.CoverId);
              covers.splice(CoverIndex,1);
              if(this.coverModificationYN=='Y') {rowData['DifferenceYN'] = 'N';}
              if(directType=='change' && this.endorsementSection){
                if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                if(!vehicle?.totalPremium) { vehicle['totalPremium'] = 0 ;}
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                    console.log('Minus premiums1',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium'] - rowData.PremiumIncludedTax;
                  }
                
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  console.log('Minus premiums2',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                }
              
              }
              if(rowData.SubCovers){
                rowData.SubCoverId=null;
                for(let sub of rowData.SubCovers){
                  sub['selected'] = false;
                }
              }
              this.getTotalVehiclesCost();
            }
          }
        }
  }
  getTotalVehiclesCost(){
    let totalCost = 0,i=0,totalLocalCost=0;
    for(let veh of this.vehicleDetailsList){
      if(veh?.totalPremium) totalCost = totalCost+veh?.totalPremium;console.log('Total1 premium',veh,totalCost,veh?.totalPremium);
      if(veh?.totalLcPremium) totalLocalCost = totalLocalCost+veh?.totalLcPremium; console.log('Total2 premium',veh,totalLocalCost,veh?.totalLcPremium);
      i+=1;
      if(i==this.vehicleDetailsList.length){
          this.localPremiumCost = totalLocalCost;
          this.totalPremium = totalCost;
          if(this.vehicleData[0].EmiYn!=null && this.vehicleData[0].EmiYn!=undefined && this.vehicleData[0].EmiYn!=''){
          this.emiYN = this.vehicleData[0].EmiYn;
          this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
          if(this.emiYN=='Y'){
            this.onEmiYNChange();
          }
        }
        else if(!this.endorsementSection) {
          this.emiYN = "N";
          //this.EmiInstallment();
        }
      }
    }
    
  }
  onEmiYNChange(){
    if(this.emiYN == 'Y'){
      this.EmiInstallment();
    }
  }
  EmiInstallment(){
    this.yearlySection =false;this.nineMonthSection=false;this.sixMonthSection=false;this.threeMonthSection=false;this.fiveMonthSection=false;
    let ReqObj = {
     "PremiumWithTax": this.totalPremium,
     "InsuranceId":this.insuranceId,
     "ProductId":this.productId,
     "Currency": this.currencyCode,
     "PolicyType":this.emipolicytype
    }
    let urlLink = `${this.CommonApiUrl}api/viewemi`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            //let emiList = data.Result;
            let emiList=[];
            emiList = data.Result;
            let EmiYnShow =data.Result[0].EmiYn;
            if(EmiYnShow=='Y')
            {
              if(emiList.length!=0){

                let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[],fiveList=[],eightList=[];
                for(let entry of emiList){
                    let emiDetails = entry.EmiPremium;
                    if(emiDetails.length==13){
                      this.yearlySection = true;
                      yearlyList = entry.EmiPremium;
                    }
                    else if(emiDetails.length==10){
                      nineList = entry.EmiPremium;
                      this.nineMonthSection = true;
                    }
                    else if(emiDetails.length==7){
                      sixList = entry.EmiPremium;
                      this.sixMonthSection = true;
                    }
                    else if(emiDetails.length==3){
                      threeList = entry.EmiPremium;
                      this.threeMonthSection = true;
                      
                    }
                    else if(emiDetails.length==6){
                      fiveList = entry.EmiPremium;
                      this.fiveMonthSection = true;
                    }
                    else if(emiDetails.length==9){
                      eightList = entry.EmiPremium;
                      this.eightMonthSection = true;
                    }
                    i+=1;
                    if(i==emiList.length){
                      this.setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList);
                    }
                }
              }
              else{
                this.emiYN='N';
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   'EMI Option',
                //   'No EMI Plan Available',
                //   config);
               }
            }
            else{
            }

            //this.getBorrowerList();
        }
      },
      (err) => { },
    );
  }
  setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
              if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
              else{data['yearlyAmount']=null}
              if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
              else{data['nineAmount']=null}
              if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
              else{data['sixAmount']=null}
              if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
              else{data['threeAmount']=null}
              if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
              else{data['fiveAmount']=null}
              if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
              else{data['eightAmount']=null}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
           else{data['fiveAmount']=null}
           if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
           else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
           else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
           else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
   else if(this.fiveMonthSection){
    let i=0;this.Emilist1=[];
    for(let entry of fiveList){
         let data = entry;
         if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
         else{data['yearlyAmount']=null}
         if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
         else{data['nineAmount']=null}
         if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
         else{data['sixAmount']=null}
         if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
         else{data['threeAmount']=null}
         if(threeList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
         else{data['fiveAmount']=null}
         if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
         else{data['eightAmount']=null}
         this.Emilist1.push(entry);
         i+=1;
         if(i==fiveList.length){this.emiSection=true}
    }
 }
 else if(this.eightMonthSection){
  let i=0;this.Emilist1=[];
  for(let entry of fiveList){
       let data = entry;
       if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
       else{data['yearlyAmount']=null}
       if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
       else{data['nineAmount']=null}
       if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
       else{data['sixAmount']=null}
       if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
       else{data['threeAmount']=null}
       if(threeList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
       else{data['fiveAmount']=null}
       if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
       else{data['eightAmount']=null}
       this.Emilist1.push(entry);
       i+=1;
       if(i==eightList.length){this.emiSection=true}
  }
  }
  }
  onSelectSection(){
    console.log("Current Id",this.selectedRowData)
    if(this.selectedRowData!=null){
      this.coverSection = false;
      this.selectedVehicleList = [this.selectedRowData]
      this.coverSection = true;

    }
  }
  onChangeSubCover(subCover,cover,vehicle,event,element){
    if(subCover==undefined || subCover==null){
      if(element){
        subCover = cover.SubCovers.find(ele=>ele.SubCoverId==element.value)
      }
    }
    if(subCover.MultiSelectYn=='Y'){
        if(event){
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.LocationId==vehicle.LocationId );
            if(entry.length==0){
              let id=null;
              if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
              let element = {
                  "Covers": [
                    {
                      "CoverId": cover.CoverId,
                      "SubCoverId": subCover.SubCoverId,
                      "SubCoverYn": "Y",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "LocationId": vehicle.LocationId,
                  "Id": id,
                  "SectionId": cover.SectionId
                }
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  //cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              console.log("Selected Covers",this.selectedCoverList)
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
                console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
             let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
             if(sectionEntry == undefined){
              let id=null;
              if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
              let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "LocationId": vehicle.LocationId,
                "Id": id,
                "SectionId": cover.SectionId
              }
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                 // cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
                // if(vehicle?.totalPremium){
                //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
                //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
                // }
                // else{
                //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                // }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
             }
             else{
               console.log("Sections",sectionEntry)
              let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
              if(findCover.length==0) {
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId":subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.selected = true;
                for(let sub of cover.SubCovers){
                  if(sub.SubCoverId==subCover.SubCoverId){
                   // cover['isReferal'] = sub.isReferal;
                    cover['SumInsured'] = sub.SumInsured;
                    cover['Loadings'] = sub.Loadings;
                    cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                    cover['MinimumPremium'] = sub.MinimumPremium;
                    cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                    cover['Discounts'] = sub?.Discounts;
                    cover['CalcType'] = sub?.CalcType;
                    cover['Rate'] = sub?.Rate;
                    cover['ExcessPercent'] = sub?.ExcessPercent;
                    cover['ExcessAmount'] = sub?.ExcessAmount;
                    cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                    cover['ExchangeRate'] = sub?.ExchangeRate;
                    cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                    cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                    cover['Taxes'] = sub.Taxes;
                    cover['SubCoverId'] = sub.SubCoverId
                    sub['selected'] = true;
                  }
                  else{
                    sub['selected'] = false;
                  }
                }
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if(vehicle?.totalPremium){
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                  }
                
                }
                else{
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                    vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
              }
              else{
                console.log("Finded Covers",findCover,sectionEntry)
                let subCoverEntry = findCover.filter(ele=>ele.SubCoverId==subCover.SubCoverId);
                if(subCoverEntry.length==0){
                  let newEntry = {
                    "CoverId": cover.CoverId,
                    "SubCoverId":subCover.SubCoverId,
                    "SubCoverYn": "Y"
                    //"isReferal": rowData.isReferal
                  }
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                  cover.selected = true;
                  for(let sub of cover.SubCovers){
                    if(sub.SubCoverId==subCover.SubCoverId){
                      //cover['isReferal'] = sub.isReferal;
                      cover['SumInsured'] = sub.SumInsured;
                      cover['Loadings'] = sub.Loadings;
                      cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                      cover['MinimumPremium'] = sub.MinimumPremium;
                      cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                      cover['Discounts'] = sub?.Discounts;
                      cover['CalcType'] = sub?.CalcType;
                      cover['Rate'] = sub?.Rate;
                      cover['ExcessPercent'] = sub?.ExcessPercent;
                      cover['ExcessAmount'] = sub?.ExcessAmount;
                      cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                      cover['ExchangeRate'] = sub?.ExchangeRate;
                      cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                      cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                      cover['Taxes'] = sub.Taxes;
                      cover['SubCoverId'] = sub.SubCoverId
                      sub['selected'] = true;
                    }
                    else{
                      sub['selected'] = false;
                    }
                  }
                  subCover['selected'] = true;
                  sectionEntry.Covers.push(newEntry);
                  if(vehicle?.totalPremium){
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                    }
                  
                  }
                  else{
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                      vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                    }
                    
                  }
                  console.log("Total Premium",cover,vehicle)
                  this.getTotalVehiclesCost();
                }
                
              }
             }
            }
          }
          else{
            let id=null;
            if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "LocationId": vehicle.LocationId,
              "Id": id,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremium'] = sub.MinimumPremium;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                cover['SubCoverId'] = sub.SubCoverId
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
              
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            this.getTotalVehiclesCost();
          }
        }
        else{
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.LocationId==vehicle.LocationId);
            console.log("Entry List",entry);
            let sectionEntry = entry.find(ele=>ele.SectionId==cover.SectionId);
            sectionEntry.Covers = sectionEntry.Covers.filter(ele=>ele.SubCoverId!=subCover.SubCoverId )
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
            subCover['selected'] = false;
            
            cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
            if(vehicle?.totalPremium==null || vehicle?.totalPremium==undefined){ vehicle['totalLcPremium']=0;vehicle['totalPremium']=0 }
            if(vehicle?.totalPremium){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']-subCover.PremiumIncludedTax;
              if(findCover.length==0){cover['selected'] = false;  vehicle['totalPremium'] =  vehicle['totalPremium']-cover.PremiumIncludedTax; vehicle['totalLcPremium'] =  vehicle['totalLcPremium']-cover.PremiumIncludedTax;}
            }
            else{
              if(findCover.length!=0){
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
        }
    }
    else{
      if(this.selectedCoverList.length!=0){
        let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.LocationId==vehicle.LocationId);
        if(entry.length==0){
          let id=null;
            if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
          let element = {
              "Covers": [{ "CoverId": cover.CoverId,"SubCoverId": subCover.SubCoverId,"SubCoverYn": "Y" }],
              "LocationId": vehicle.LocationId,"Id": id,"SectionId": cover.SectionId
            }
            if((cover.PremiumIncludedTax!=null && cover.PremiumIncludedTax!='0' && cover.PremiumIncludedTax!=undefined)){
              
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTax=0;
            }
            cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          cover['selected'] = true;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremium'] = sub.MinimumPremium;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              cover['SubCoverId'] = sub.SubCoverId;
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
          }
          
          this.getTotalVehiclesCost();
        }
        else{
          
         let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
         if(sectionEntry == undefined){
          let id=null;
          if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
          let element = {
            "Covers": [
              {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y",
                //"isReferal": rowData.isReferal
              }
            ],
            "LocationId": vehicle.LocationId,
            "Id": id,
            "SectionId": cover.SectionId
          }
          if((cover.PremiumIncludedTax!=null && cover.PremiumIncludedTax!='0' && cover.PremiumIncludedTax!=undefined)){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
            cover.PremiumIncludedTax = 0;
            cover.PremiumIncludedTax=0;
          }
          cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
          cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          cover.selected = true;
          cover.SubCoverId = subCover.SubCoverId;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremium'] = sub.MinimumPremium;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              cover['SubCoverId'] = sub.SubCoverId
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
          }
            this.getTotalVehiclesCost();
         }
         else{
          
          let covers:any[] = sectionEntry.Covers;
          let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
          if(findCover.length==0) {
            let newEntry = {
              "CoverId": cover.CoverId,
              "SubCoverId":subCover.SubCoverId,
              "SubCoverYn": "Y"
            }
            cover.SubCoverId = subCover.SubCoverId;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremium'] = sub.MinimumPremium;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                cover['SubCoverId'] = sub.SubCoverId;
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            sectionEntry.Covers.push(newEntry);
            
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
          else{
            console.log("Finded Covers",findCover,sectionEntry)
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId":subCover.SubCoverId,
                "SubCoverYn": "Y"
              }
              if((cover.PremiumIncludedTax!=null && cover.PremiumIncludedTax!='0' && cover.PremiumIncludedTax!=undefined)){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
                cover.PremiumIncludedTax = 0;
                cover.PremiumIncludedTax= 0;
              }
              cover.SubCoverId = subCover.SubCoverId;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              let subIndex = sectionEntry.Covers.findIndex(ele=>ele.CoverId==cover.CoverId);
              sectionEntry.Covers[subIndex] = newEntry;
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
              }
              console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
            
            
          }
         }
        }
      }
      else{
        let id=null;
          if(cover.VehicleId) id= cover.VehicleId; else id=vehicle.VehicleId
        let element = {
          "Covers": [{
              "CoverId": cover.CoverId,
              "SubCoverId": subCover.SubCoverId,
              "SubCoverYn": "Y"
            }],
          "LocationId": vehicle.LocationId,
          "Id": id,
          "SectionId": cover.SectionId
        }
        if((cover.PremiumIncludedTax!=null && cover.PremiumIncludedTax!='0' && cover.PremiumIncludedTax!=undefined)){
          vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
          vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
          cover.PremiumIncludedTax = 0;
          cover.PremiumIncludedTax=0;
        }
        cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
        cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
        cover.selected = true;
        for(let sub of cover.SubCovers){
          if(sub.SubCoverId==subCover.SubCoverId){
            cover['isReferal'] = sub.isReferal;
            cover['SumInsured'] = sub.SumInsured;
            cover['Loadings'] = sub.Loadings;
            cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
            cover['MinimumPremium'] = sub.MinimumPremium;
            cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
            cover['Discounts'] = sub?.Discounts;
            cover['CalcType'] = sub?.CalcType;
            cover['Rate'] = sub?.Rate;
            cover['ExcessPercent'] = sub?.ExcessPercent;
            cover['ExcessAmount'] = sub?.ExcessAmount;
            cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
            cover['ExchangeRate'] = sub?.ExchangeRate;
            cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
            cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
            cover['Taxes'] = sub.Taxes;
            cover['SubCoverId'] = sub.SubCoverId
            sub['selected'] = true;
          }
          else{
            sub['selected'] = false;
          }
        }
        subCover['selected'] = true;
        this.selectedCoverList.push(element);
        if(vehicle?.totalPremium){
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
          }
          
        }
        else{
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
            vehicle['totalPremium'] =  cover.PremiumIncludedTax;
          }
          
        }
        this.getTotalVehiclesCost();
      }
    }
  }

  showOtpPopup = false;

  openOtpPopup(): void {
    this.showOtpPopup = true;
  }

  closeOtpPopup(): void {
    this.showOtpPopup = false;
  }
}

