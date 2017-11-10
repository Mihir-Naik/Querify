import React from 'react'

const Home = (props) => {
	return (
		<div className='Home'>
<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" styles="{max-height=800px;}">
	<div class="carousel-inner">
		<div class="carousel-item active">
			<img class="d-block w-100" src="https://www.maxon.net/fileadmin/_processed_/7/0/csm_Blog_Banner_523bcf445e.jpg" alt="First slide" />
		</div>
		<div class="carousel-item">
			<img class="d-block w-100" src="https://img.youtube.com/vi/QGVtK2_5UYk/maxresdefault.jpg" alt="Second slide" />
		</div>
		<div class="carousel-item">
			<img class="d-block w-100" src="https://static1.squarespace.com/static/544d9c58e4b0d4afb0278e3b/t/57ff0040d482e9b6837fa279/1476329560228/Blog+Page+Banner.png?format=1500w" alt="Third slide" />
		</div>
		<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
	</div>
</div>

		<nav className="navbar fixed-bottom navbar-light bg-light">
			© 2017 Querify. No Rights Reserved Yet.
			<a className="navbar-brand" href="https://github.com/Mihir-Naik">Created By: Mihir Naik</a>
		</nav>
		</div>
	)
}

export default Home