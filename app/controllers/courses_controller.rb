class CoursesController < ApplicationController

  def index
    @courses = Course.all
  end

  def new
    @course = Course.new
  end

  def show
    @course = Course.find(params[:id])

  end

  def create
    @course = Course.new(course_params)
    @course.par_hash = par_hash
    if @course.save
      redirect_to courses_url
    else
      render :new
    end
  end

  def destroy

    @course = Course.find(params[:id])
    @course.destroy
    redirect_to rounds_url
  end

  def edit
    @course = Course.find(params[:id])
  end


  private

  def course_params
    params.require(:course).permit(:name)

  end




  def par_hash
    par_hash = {}
    params[:course].each do |param, val|
      if param.start_with?("hole")
        par_hash[param] = val
      end
    end
    par_hash
  end


end
