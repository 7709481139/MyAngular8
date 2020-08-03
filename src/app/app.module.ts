import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { DatePipe, APP_BASE_HREF } from '@angular/common';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { AgGridModule } from '@ag-grid-community/angular';
import { DragDropDirective } from './directives/drag-drop.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthService } from './_services/auth.service';
import { appRoutes } from './routes';
import { DefineVotingComponent } from './defineVoting/defineVoting.component';
import { VotingComponent } from './votingproc/voting/voting.component';
import { SinglevoteComponent } from './votingproc/singlevote/singlevote.component';
import { BusinesspartnerComponent } from './businesspartner/businesspartner.component';
import { BPlistdialog } from './businesspartner/BPlistdialog';
import { PortfolioComplianceComponent } from './Compliance/PortfolioCompliance/PortfolioCompliance.component';
import { StageComponent } from './Compliance/stage/stage.component';
import { VotingreportComponent } from './votingreport/votingreport.component';
import { SearchPipe } from './votingreport/search.pipe';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { BoardMeetingComponent } from './BoardMeeting/BoardMeeting.component';
import { WeeklyMeetingComponent } from './weeklyMeeting/weeklyMeeting.component';
import { Listdialog } from './weeklyMeeting/List-dialog';
import { MISUploadComponent } from './MIS-Upload/MIS-Upload.component';
import { LoginComponent } from './newlogin/login/login.component';
import { VotingcommentryreportComponent } from './votingcommentryreport/votingcommentryreport.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { CapTableComponent } from './CapTable/Captable.component';
import { RoleComponent } from './role/role.component';
import { IgxHierarchicalGridModule } from 'igniteui-angular';
import { IgxExcelExporterService } from "igniteui-angular";
import { IgxTreeGridComponent } from "igniteui-angular";
import {
   MatAutocompleteModule,
   MatBadgeModule,
   MatBottomSheetModule,
   MatButtonModule,
   MatButtonToggleModule,
   MatCardModule,
   MatCheckboxModule,
   MatChipsModule,
   MatDatepickerModule,
   MatDialogModule,
   MatDividerModule,
   MatExpansionModule,
   MatGridListModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatNativeDateModule,
   MatPaginatorModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatRippleModule,
   MatSelectModule,
   MatSidenavModule,
   MatSliderModule,
   MatSlideToggleModule,
   MatSnackBarModule,
   MatSortModule,
   MatStepperModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatTreeModule,
   MAT_DATE_LOCALE
   


} from '@angular/material';
import { TokenInterceptorProvider } from './_services/token.interceptor';

import { LayoutModule } from '@angular/cdk/layout';
import { AuthorizationComponent } from './authorization/authorization.component';



export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   exports: [
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      RatingModule,
      NgxMaterialTimepickerModule
   ],
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      DefineVotingComponent,
      VotingComponent,
      SinglevoteComponent,
      BusinesspartnerComponent,
      BPlistdialog,
      PortfolioComplianceComponent,
      StageComponent,
      VotingreportComponent,
      SearchPipe,
      PasswordresetComponent,
      BoardMeetingComponent,
      WeeklyMeetingComponent,
      Listdialog,
      MISUploadComponent,
      DragDropDirective,
      LoginComponent,
      VotingcommentryreportComponent,
      DashboardComponent,
      CapTableComponent,
      RoleComponent,
      AuthorizationComponent
   ],
   entryComponents: [
      BPlistdialog,
      Listdialog
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),   
      JwtModule.forRoot({
         // tslint:disable-next-line:object-literal-shorthand
         config: { tokenGetter: tokenGetter, whitelistedDomains: ['15.206.106.217'], blacklistedRoutes: ['15.206.106.217/api/auth/'] }
      }),

      RatingModule,
      NgxMaterialTimepickerModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      jqxDataTableModule,
      AgGridModule,
      LayoutModule,
      IgxHierarchicalGridModule
      
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      TokenInterceptorProvider,
      IgxExcelExporterService ,IgxTreeGridComponent,
      DatePipe,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: APP_BASE_HREF, useValue: '/TESTA91Partners' },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
