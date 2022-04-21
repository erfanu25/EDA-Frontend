import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel-genUp-UI';

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  navigateToDataMapping() {
    this.router.navigate(['dataMapping'], { relativeTo: this.route });
  }
  navigateToDataAnalysis() {
    this.router.navigate(['']);
  }
}
