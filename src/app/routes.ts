import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { DefineVotingComponent } from './defineVoting/defineVoting.component';
import { VotingComponent } from './votingproc/voting/voting.component';
import { BusinesspartnerComponent } from './businesspartner/businesspartner.component';
import { PortfolioComplianceComponent } from './Compliance/PortfolioCompliance/PortfolioCompliance.component';
import { VotingreportComponent } from './votingreport/votingreport.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { LoginComponent } from './newlogin/login/login.component';
import { BoardMeetingComponent } from './BoardMeeting/BoardMeeting.component';
import { WeeklyMeetingComponent } from './weeklyMeeting/weeklyMeeting.component';
import { MISUploadComponent } from './MIS-Upload/MIS-Upload.component';
import { VotingcommentryreportComponent } from './votingcommentryreport/votingcommentryreport.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { CapTableComponent } from './CapTable/Captable.component';
import { RoleComponent } from './role/role.component';
import { AuthorizationComponent } from './authorization/authorization.component';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'ClientRegistration', component: BusinesspartnerComponent, canActivate: [AuthGuard] },
    { path: 'Portfolio', component: PortfolioComplianceComponent, canActivate: [AuthGuard] },
    { path: 'DefineVoting', component: DefineVotingComponent, canActivate: [AuthGuard] },
    { path: 'Voting', component: VotingComponent, canActivate: [AuthGuard] },
    { path: 'Votingreport', component: VotingreportComponent, canActivate: [AuthGuard] },
    { path: 'Votingcommentryreport', component: VotingcommentryreportComponent, canActivate: [AuthGuard] },
    { path: 'Register', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'Resetpassword', component: PasswordresetComponent, canActivate: [AuthGuard] },
    { path: 'Createrole', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'Boardmeeting', component: BoardMeetingComponent, canActivate: [AuthGuard] },
    { path: 'Weeklymeeting', component: WeeklyMeetingComponent, canActivate: [AuthGuard] },
    { path: 'MISupload', component: MISUploadComponent, canActivate: [AuthGuard] },
    { path: 'CapTable', component: CapTableComponent, canActivate: [AuthGuard] },
    { path: 'Authorization', component: AuthorizationComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'Login', pathMatch: 'full' },
];
