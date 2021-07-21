import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  restaurants = [];

  options = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    slidesOffsetBefore: 10
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.apiService.getAllProviders().subscribe(result => {
      console.log(result);
      this.restaurants = result;
    });
  }

  openDetails(restaurant) {
    const split = restaurant.url.split('/');
    const restaurantId = split[split.length - 2];
    this.router.navigateByUrl(`/restaurants/${restaurantId}`);
  }
}
